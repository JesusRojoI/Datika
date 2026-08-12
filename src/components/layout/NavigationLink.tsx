'use client';

import { useRouter } from 'next/navigation';

interface NavigationLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function NavigationLink({ href, className, children, onClick }: NavigationLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    // Usar window.location para forzar recarga completa
    window.location.href = href;
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
