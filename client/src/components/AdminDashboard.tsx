import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useStocks } from "@/hooks/useStocks";
import { useNews } from "@/hooks/useNews";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: stocks, isLoading: stocksLoading } = useStocks();
  const { data: news, isLoading: newsLoading } = useNews();
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();

  const [editingStock, setEditingStock] = useState<any>(null);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  // Stock mutations
  const createStockMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/admin/stocks", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stocks"] });
      toast({ title: "Success", description: "Stock created successfully" });
      setEditingStock(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create stock", variant: "destructive" });
    },
  });

  const updateStockMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await apiRequest("PUT", `/api/admin/stocks/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stocks"] });
      toast({ title: "Success", description: "Stock updated successfully" });
      setEditingStock(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update stock", variant: "destructive" });
    },
  });

  const deleteStockMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/stocks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stocks"] });
      toast({ title: "Success", description: "Stock deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete stock", variant: "destructive" });
    },
  });

  // News mutations
  const createNewsMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/admin/news", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      toast({ title: "Success", description: "News article created successfully" });
      setEditingNews(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create news article", variant: "destructive" });
    },
  });

  const updateNewsMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await apiRequest("PUT", `/api/admin/news/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      toast({ title: "Success", description: "News article updated successfully" });
      setEditingNews(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update news article", variant: "destructive" });
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/news/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news"] });
      toast({ title: "Success", description: "News article deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete news article", variant: "destructive" });
    },
  });

  // Testimonial mutations
  const createTestimonialMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/admin/testimonials", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({ title: "Success", description: "Testimonial created successfully" });
      setEditingTestimonial(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create testimonial", variant: "destructive" });
    },
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await apiRequest("PUT", `/api/admin/testimonials/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({ title: "Success", description: "Testimonial updated successfully" });
      setEditingTestimonial(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update testimonial", variant: "destructive" });
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({ title: "Success", description: "Testimonial deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete testimonial", variant: "destructive" });
    },
  });

  const handleStockSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      symbol: formData.get("symbol") as string,
      name: formData.get("name") as string,
      price: formData.get("price") as string,
      change: formData.get("change") as string,
      changePercent: formData.get("changePercent") as string,
      volume: parseInt(formData.get("volume") as string) || 0,
      marketCap: formData.get("marketCap") as string,
      sector: formData.get("sector") as string,
      isActive: formData.get("isActive") === "on",
    };

    if (editingStock?.id) {
      updateStockMutation.mutate({ id: editingStock.id, data });
    } else {
      createStockMutation.mutate(data);
    }
  };

  const handleNewsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      imageUrl: formData.get("imageUrl") as string,
      category: formData.get("category") as string,
      author: formData.get("author") as string,
      publishedAt: new Date(formData.get("publishedAt") as string).toISOString(),
      isPublished: formData.get("isPublished") === "on",
    };

    if (editingNews?.id) {
      updateNewsMutation.mutate({ id: editingNews.id, data });
    } else {
      createNewsMutation.mutate(data);
    }
  };

  const handleTestimonialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      company: formData.get("company") as string,
      content: formData.get("content") as string,
      rating: parseInt(formData.get("rating") as string) || 5,
      avatarUrl: formData.get("avatarUrl") as string,
      isActive: formData.get("isActive") === "on",
    };

    if (editingTestimonial?.id) {
      updateTestimonialMutation.mutate({ id: editingTestimonial.id, data });
    } else {
      createTestimonialMutation.mutate(data);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">TradePro Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your stock trading platform content</p>
      </div>

      <Tabs defaultValue="stocks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="stocks" data-testid="tab-stocks">Stocks</TabsTrigger>
          <TabsTrigger value="news" data-testid="tab-news">News</TabsTrigger>
          <TabsTrigger value="testimonials" data-testid="tab-testimonials">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="stocks" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Stock Management</CardTitle>
                <CardDescription>Manage stock listings and market data</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingStock({})} data-testid="button-add-stock">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stock
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingStock?.id ? "Edit Stock" : "Add New Stock"}</DialogTitle>
                    <DialogDescription>
                      {editingStock?.id ? "Update stock information" : "Enter stock details"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleStockSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="symbol">Symbol</Label>
                        <Input id="symbol" name="symbol" defaultValue={editingStock?.symbol} required data-testid="input-stock-symbol" />
                      </div>
                      <div>
                        <Label htmlFor="name">Company Name</Label>
                        <Input id="name" name="name" defaultValue={editingStock?.name} required data-testid="input-stock-name" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" name="price" type="number" step="0.01" defaultValue={editingStock?.price} required data-testid="input-stock-price" />
                      </div>
                      <div>
                        <Label htmlFor="change">Change</Label>
                        <Input id="change" name="change" type="number" step="0.01" defaultValue={editingStock?.change} required data-testid="input-stock-change" />
                      </div>
                      <div>
                        <Label htmlFor="changePercent">Change %</Label>
                        <Input id="changePercent" name="changePercent" type="number" step="0.01" defaultValue={editingStock?.changePercent} required data-testid="input-stock-change-percent" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="volume">Volume</Label>
                        <Input id="volume" name="volume" type="number" defaultValue={editingStock?.volume} data-testid="input-stock-volume" />
                      </div>
                      <div>
                        <Label htmlFor="marketCap">Market Cap</Label>
                        <Input id="marketCap" name="marketCap" defaultValue={editingStock?.marketCap} data-testid="input-stock-market-cap" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sector">Sector</Label>
                      <Input id="sector" name="sector" defaultValue={editingStock?.sector} data-testid="input-stock-sector" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="isActive" name="isActive" defaultChecked={editingStock?.isActive !== false} data-testid="switch-stock-active" />
                      <Label htmlFor="isActive">Active</Label>
                    </div>
                    <DialogFooter>
                      <Button type="submit" data-testid="button-save-stock">
                        {editingStock?.id ? "Update" : "Create"} Stock
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {stocksLoading ? (
                <div>Loading stocks...</div>
              ) : (
                <div className="space-y-4">
                  {stocks?.map((stock) => (
                    <div key={stock.id} className="flex items-center justify-between p-4 border rounded-lg" data-testid={`stock-item-${stock.symbol}`}>
                      <div className="flex-1">
                        <div className="font-semibold">{stock.symbol} - {stock.name}</div>
                        <div className="text-sm text-gray-600">
                          ${stock.price} ({parseFloat(stock.change) >= 0 ? '+' : ''}{stock.changePercent}%)
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingStock(stock)}
                          data-testid={`button-edit-stock-${stock.symbol}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteStockMutation.mutate(stock.id)}
                          data-testid={`button-delete-stock-${stock.symbol}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>News Management</CardTitle>
                <CardDescription>Manage news articles and market updates</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingNews({})} data-testid="button-add-news">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingNews?.id ? "Edit Article" : "Add New Article"}</DialogTitle>
                    <DialogDescription>
                      {editingNews?.id ? "Update article information" : "Create a new news article"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleNewsSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" name="title" defaultValue={editingNews?.title} required data-testid="input-news-title" />
                    </div>
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea id="excerpt" name="excerpt" defaultValue={editingNews?.excerpt} required data-testid="textarea-news-excerpt" />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea id="content" name="content" defaultValue={editingNews?.content} rows={6} required data-testid="textarea-news-content" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input id="imageUrl" name="imageUrl" defaultValue={editingNews?.imageUrl} data-testid="input-news-image-url" />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" defaultValue={editingNews?.category}>
                          <SelectTrigger data-testid="select-news-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Market Update">Market Update</SelectItem>
                            <SelectItem value="Breaking">Breaking</SelectItem>
                            <SelectItem value="Analysis">Analysis</SelectItem>
                            <SelectItem value="Trending">Trending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Input id="author" name="author" defaultValue={editingNews?.author} required data-testid="input-news-author" />
                      </div>
                      <div>
                        <Label htmlFor="publishedAt">Published Date</Label>
                        <Input 
                          id="publishedAt" 
                          name="publishedAt" 
                          type="datetime-local"
                          defaultValue={editingNews?.publishedAt ? new Date(editingNews.publishedAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)}
                          required 
                          data-testid="input-news-published-date"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="isPublished" name="isPublished" defaultChecked={editingNews?.isPublished !== false} data-testid="switch-news-published" />
                      <Label htmlFor="isPublished">Published</Label>
                    </div>
                    <DialogFooter>
                      <Button type="submit" data-testid="button-save-news">
                        {editingNews?.id ? "Update" : "Create"} Article
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {newsLoading ? (
                <div>Loading news articles...</div>
              ) : (
                <div className="space-y-4">
                  {news?.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg" data-testid={`news-item-${article.id}`}>
                      <div className="flex-1">
                        <div className="font-semibold">{article.title}</div>
                        <div className="text-sm text-gray-600">{article.category} • {article.author}</div>
                        <div className="text-sm text-gray-500 mt-1">{article.excerpt.substring(0, 100)}...</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingNews(article)}
                          data-testid={`button-edit-news-${article.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteNewsMutation.mutate(article.id)}
                          data-testid={`button-delete-news-${article.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Testimonial Management</CardTitle>
                <CardDescription>Manage customer testimonials and reviews</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button onClick={() => setEditingTestimonial({})} data-testid="button-add-testimonial">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingTestimonial?.id ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
                    <DialogDescription>
                      {editingTestimonial?.id ? "Update testimonial information" : "Create a new customer testimonial"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" defaultValue={editingTestimonial?.name} required data-testid="input-testimonial-name" />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Input id="role" name="role" defaultValue={editingTestimonial?.role} required data-testid="input-testimonial-role" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" defaultValue={editingTestimonial?.company} data-testid="input-testimonial-company" />
                    </div>
                    <div>
                      <Label htmlFor="content">Testimonial Content</Label>
                      <Textarea id="content" name="content" defaultValue={editingTestimonial?.content} rows={4} required data-testid="textarea-testimonial-content" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rating">Rating</Label>
                        <Select name="rating" defaultValue={editingTestimonial?.rating?.toString() || "5"}>
                          <SelectTrigger data-testid="select-testimonial-rating">
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Star</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="5">5 Stars</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="avatarUrl">Avatar URL</Label>
                        <Input id="avatarUrl" name="avatarUrl" defaultValue={editingTestimonial?.avatarUrl} data-testid="input-testimonial-avatar-url" />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="isActive" name="isActive" defaultChecked={editingTestimonial?.isActive !== false} data-testid="switch-testimonial-active" />
                      <Label htmlFor="isActive">Active</Label>
                    </div>
                    <DialogFooter>
                      <Button type="submit" data-testid="button-save-testimonial">
                        {editingTestimonial?.id ? "Update" : "Create"} Testimonial
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {testimonialsLoading ? (
                <div>Loading testimonials...</div>
              ) : (
                <div className="space-y-4">
                  {testimonials?.map((testimonial) => (
                    <div key={testimonial.id} className="flex items-center justify-between p-4 border rounded-lg" data-testid={`testimonial-item-${testimonial.id}`}>
                      <div className="flex-1">
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}{testimonial.company && `, ${testimonial.company}`}</div>
                        <div className="text-sm text-gray-500 mt-1">"{testimonial.content.substring(0, 100)}..."</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingTestimonial(testimonial)}
                          data-testid={`button-edit-testimonial-${testimonial.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteTestimonialMutation.mutate(testimonial.id)}
                          data-testid={`button-delete-testimonial-${testimonial.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
