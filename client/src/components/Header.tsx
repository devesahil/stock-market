import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { getContentValue } from "@/utils/contentHelpers";

export default function Header() {
  const { data: content } = usePageContent();
  return (
    <header className="bg-white shadow-sm border-b border-neutral-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="ml-2 text-xl font-bold text-neutral-900">{getContentValue(content, 'header', 'brand_name', 'TradePro')}</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#markets" className="text-neutral-600 hover:text-primary transition-colors duration-300 px-3 py-2 text-sm font-medium">{getContentValue(content, 'header', 'nav_markets', 'Markets')}</a>
              <a href="#research" className="text-neutral-600 hover:text-primary transition-colors duration-300 px-3 py-2 text-sm font-medium">{getContentValue(content, 'header', 'nav_research', 'Research')}</a>
              <a href="#education" className="text-neutral-600 hover:text-primary transition-colors duration-300 px-3 py-2 text-sm font-medium">{getContentValue(content, 'header', 'nav_education', 'Education')}</a>
              <a href="#pricing" className="text-neutral-600 hover:text-primary transition-colors duration-300 px-3 py-2 text-sm font-medium">{getContentValue(content, 'header', 'nav_pricing', 'Pricing')}</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-neutral-600 hover:text-primary transition-colors duration-300" data-testid="button-sign-in">
              {getContentValue(content, 'header', 'button_signin', 'Sign In')}
            </Button>
            <Button className="bg-primary hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" data-testid="button-get-started">
              {getContentValue(content, 'header', 'button_getstarted', 'Get Started')}
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-primary transition-colors duration-300" data-testid="button-mobile-menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
