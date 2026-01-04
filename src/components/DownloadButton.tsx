// src/components/DownloadButton.tsx
import { MegaLinkStatus } from '@/lib/types';
import { Download, Clock, AlertCircle, ExternalLink } from 'lucide-react';

interface DownloadButtonProps {
  status: MegaLinkStatus;
  className?: string;
}

export default function DownloadButton({ status, className = '' }: DownloadButtonProps) {
  if (status.type === 'available') {
    return (
      <a
        href={status.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`archive-button ${className}`}
      >
        <Download className="h-5 w-5 mr-2" />
        Download from Mega
        <ExternalLink className="h-4 w-4 ml-2" />
      </a>
    );
  }

  if (status.type === 'coming_soon') {
    return (
      <div className={`archive-button-disabled ${className}`}>
        <Clock className="h-5 w-5 mr-2" />
        Coming Soon
      </div>
    );
  }

  // unavailable
  return (
    <div className={`archive-button-disabled ${className}`}>
      <AlertCircle className="h-5 w-5 mr-2" />
      Link Not Yet Available
    </div>
  );
}