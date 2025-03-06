"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Calculator, Wrench, Mail, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { href: "/", label: "Home", icon: Clock },
    { href: "/calculator", label: "Time Calculator", icon: Calculator },
    { href: "/tools", label: "Advanced Tools", icon: Wrench },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Clock className="h-6 w-6" />
            <span className="font-bold text-xl">TimeCalc</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-1 hover:text-primary transition-colors ${
                  isActive(href) ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <DropdownMenuItem key={href} asChild>
                    <Link
                      href={href}
                      className={`flex items-center space-x-2 ${
                        isActive(href) ? "text-primary font-medium" : ""
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
