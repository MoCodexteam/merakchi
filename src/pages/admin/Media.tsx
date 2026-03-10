import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock media library - in production, this would come from your storage service
const mockMedia = [
  { id: '1', url: '/images/sofa-1.jpg', name: 'sofa-1.jpg', size: '2.4 MB' },
  { id: '2', url: '/images/bedroom-1.jpg', name: 'bedroom-1.jpg', size: '1.8 MB' },
  { id: '3', url: '/images/dining-1.jpg', name: 'dining-1.jpg', size: '2.1 MB' },
  { id: '4', url: '/images/chair-1.jpg', name: 'chair-1.jpg', size: '1.2 MB' },
  { id: '5', url: '/images/table-1.jpg', name: 'table-1.jpg', size: '1.5 MB' },
  { id: '6', url: '/images/mirror-1.jpg', name: 'mirror-1.jpg', size: '0.9 MB' },
  { id: '7', url: '/images/hero-bg.jpg', name: 'hero-bg.jpg', size: '3.2 MB' },
  { id: '8', url: '/images/showroom.jpg', name: 'showroom.jpg', size: '2.7 MB' },
];

export default function AdminMedia() {
  const { t } = useTranslation();
  const [media, setMedia] = useState(mockMedia);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<(typeof mockMedia)[0] | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl) {
      const newImage = {
        id: Math.random().toString(36).substr(2, 9),
        url: imageUrl,
        name: imageUrl.split('/').pop() || 'image.jpg',
        size: 'Unknown',
      };
      setMedia([newImage, ...media]);
      setImageUrl('');
      setIsUploadOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setMedia(media.filter((m) => m.id !== id));
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--wood-dark))]">
            {t('admin.media.title')}
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your image library
          </p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)} className="btn-primary gap-2">
          <Plus className="w-5 h-5" />
          {t('admin.media.upload')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[hsl(var(--wood-dark))]">
                {media.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Images</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {media.map((item) => (
          <div
            key={item.id}
            className="group relative aspect-square rounded-xl overflow-hidden bg-[hsl(var(--beige))] cursor-pointer"
            onClick={() => setSelectedImage(item)}
          >
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard(item.url);
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(item.url, '_blank');
                }}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-400 border-red-400 hover:bg-red-500 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.media.upload')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
                className="mt-2"
              />
            </div>
            <div className="p-8 border-2 border-dashed border-border rounded-lg text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Drag and drop images here, or paste URL above
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supports: JPG, PNG, WebP
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUploadOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="btn-primary flex-1">
                Upload
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Image Detail Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Image Details</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4 pt-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-[hsl(var(--beige))]">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Filename</Label>
                  <p className="font-medium">{selectedImage.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Size</Label>
                  <p className="font-medium">{selectedImage.size}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">URL</Label>
                <div className="flex gap-2 mt-1">
                  <Input value={selectedImage.url} readOnly />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(selectedImage.url)}
                  >
                    {copySuccess ? 'Copied!' : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <a
                  href={selectedImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Open
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => {
                    handleDelete(selectedImage.id);
                    setSelectedImage(null);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
