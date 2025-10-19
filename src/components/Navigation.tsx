import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, Home, Layout, Info, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/auth');
    }
  };
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <FileText className="h-6 w-6 text-primary" />
          <span>ResumeBuilder</span>
        </Link>
        
        <div className="flex items-center gap-1">
          <Button
            variant={isActive('/') ? 'secondary' : 'ghost'}
            asChild
            className="gap-2"
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
          
          {session && (
            <>
              <Button
                variant={isActive('/templates') ? 'secondary' : 'ghost'}
                asChild
                className="gap-2"
              >
                <Link to="/templates">
                  <Layout className="h-4 w-4" />
                  <span className="hidden sm:inline">Templates</span>
                </Link>
              </Button>
              
              <Button
                variant={isActive('/build') ? 'secondary' : 'ghost'}
                asChild
                className="gap-2"
              >
                <Link to="/build">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Build</span>
                </Link>
              </Button>
            </>
          )}
          
          <Button
            variant={isActive('/about') ? 'secondary' : 'ghost'}
            asChild
            className="gap-2"
          >
            <Link to="/about">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </Link>
          </Button>

          {session ? (
            <Button variant="outline" onClick={handleSignOut} className="gap-2 ml-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          ) : (
            <Button variant="default" asChild className="ml-2">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
