'use client';

import { ROUTES } from '@/shared/config/route';
import { authClient } from '@/shared/lib/auth-client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar';
import { FolderOpen, HistoryIcon, KeyIcon, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const menuOptions = [
  {
    title: 'Main',
    items: [
      {
        title: 'Workflows',
        icon: FolderOpen,
        url: ROUTES.WORKFLOWS,
      },
      {
        title: 'Credetianl',
        icon: KeyIcon,
        url: ROUTES.CREDENTIALS,
      },
      {
        title: 'Executions',
        icon: HistoryIcon,
        url: ROUTES.EXECUTIONS,
      },
    ],
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = authClient;

  const handleLogout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(ROUTES.LOGIN);
        },
      },
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {menuOptions.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              {group.items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname.startsWith(item.url)}
                    asChild
                    className="gap-x-4 h-10 px-4"
                  >
                    <Link href={item.url} prefetch>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="gap-x-4 h-10 px-4"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
