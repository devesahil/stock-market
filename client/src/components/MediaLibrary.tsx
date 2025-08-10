import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Upload, Image as ImageIcon, Copy, Check } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Media } from "@shared/schema";

interface MediaLibraryProps {
  onSelectImage?: (url: string) => void;
  showSelectButton?: boolean;
}

export default function MediaLibrary({ onSelectImage, showSelectButton = false }: MediaLibraryProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const { data: media, isLoading } = useQuery<Media[]>({
    queryKey: ["/api/media"],
    queryFn: async () => {
      const response = await fetch("/api/media");
      if (!response.ok) throw new Error("Failed to fetch media");
      return response.json();
    },
  });

  const uploadMediaMutation = useMutation({
    mutationFn: async (data: { url: string; originalName: string; altText: string }) => {
      // For now, we'll use URL uploads. File uploads would require more backend setup
      const mediaData = {
        filename: data.originalName.replace(/[^a-zA-Z0-9.-]/g, '_'),
        originalName: data.originalName,
        mimeType: 'image/jpeg', // Default, would be detected from actual file
        size: 0, // Would be calculated from actual file
        url: data.url,
        altText: data.altText,
      };
      await apiRequest("POST", "/api/admin/media", mediaData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media"] });
      toast({ title: "Success", description: "Image uploaded successfully" });
      setUploadDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
    },
  });

  const deleteMediaMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/media/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media"] });
      toast({ title: "Success", description: "Image deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete image", variant: "destructive" });
    },
  });

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    const originalName = formData.get("originalName") as string;
    const altText = formData.get("altText") as string;

    if (!url || !originalName) {
      toast({ title: "Error", description: "URL and name are required", variant: "destructive" });
      return;
    }

    uploadMediaMutation.mutate({ url, originalName, altText });
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      toast({ title: "Copied", description: "Image URL copied to clipboard" });
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      toast({ title: "Error", description: "Failed to copy URL", variant: "destructive" });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return 'Unknown';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Media Library</CardTitle>
          <p className="text-sm text-gray-600">Manage images and media files</p>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-upload-media">
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Image</DialogTitle>
              <DialogDescription>Add a new image by providing a URL</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <Label htmlFor="url">Image URL *</Label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  required
                  data-testid="input-image-url"
                />
              </div>
              <div>
                <Label htmlFor="originalName">File Name *</Label>
                <Input
                  id="originalName"
                  name="originalName"
                  placeholder="my-image.jpg"
                  required
                  data-testid="input-image-name"
                />
              </div>
              <div>
                <Label htmlFor="altText">Alt Text</Label>
                <Input
                  id="altText"
                  name="altText"
                  placeholder="Description of the image"
                  data-testid="input-image-alt"
                />
              </div>
              <DialogFooter>
                <Button type="submit" data-testid="button-save-media">
                  Upload Image
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="w-full h-32 rounded mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        ) : media && media.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="relative mb-3">
                  <img
                    src={item.url}
                    alt={item.altText || item.originalName}
                    className="w-full h-32 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik04IDhIMTZWMTZIOFY4WiIgZmlsbD0iI0Q5RDlEOSIvPgo8L3N2Zz4K';
                    }}
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => copyToClipboard(item.url)}
                      data-testid={`button-copy-${item.id}`}
                    >
                      {copiedUrl === item.url ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => deleteMediaMutation.mutate(item.id)}
                      data-testid={`button-delete-${item.id}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm font-medium truncate" title={item.originalName}>
                  {item.originalName}
                </p>
                <p className="text-xs text-gray-500 mb-2">{formatFileSize(item.size)}</p>
                {showSelectButton && onSelectImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => onSelectImage(item.url)}
                    data-testid={`button-select-${item.id}`}
                  >
                    Select Image
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
            <p className="mt-1 text-sm text-gray-500">Upload your first image to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}