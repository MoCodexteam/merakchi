import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Mail,
  Phone,
  Trash2,
  Check,
  Clock,
  MessageSquare,
  X,
} from 'lucide-react';
import { getMessages, markMessageAsRead, deleteMessage } from '@/lib/dataService';
import type { Message } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function AdminMessages() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(id);
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const openMessageDetail = (message: Message) => {
    setSelectedMessage(message);
    setIsDetailOpen(true);
    if (!message.read) {
      handleMarkAsRead(message.id);
    }
  };

  const unreadMessages = messages.filter((m) => !m.read);
  const readMessages = messages.filter((m) => m.read);

  return (
    <div className="p-4 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--wood-dark))]">
          {t('admin.messages.title')}
        </h1>
        <p className="text-muted-foreground mt-1">
          View and manage contact form messages
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[hsl(var(--wood-dark))]">
                {messages.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Messages</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[hsl(var(--wood-dark))]">
                {unreadMessages.length}
              </p>
              <p className="text-sm text-muted-foreground">Unread</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[hsl(var(--wood-dark))]">
                {readMessages.length}
              </p>
              <p className="text-sm text-muted-foreground">Read</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">{t('admin.messages.noMessages')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow ${
                !message.read ? 'border-l-4 border-l-blue-500' : ''
              }`}
              onClick={() => openMessageDetail(message)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold text-[hsl(var(--wood-dark))]">
                        {message.name}
                      </p>
                      {!message.read && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {message.phone}
                      </span>
                      <span>
                        {new Date(message.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-muted-foreground line-clamp-2">
                      {message.message}
                    </p>
                  </div>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {!message.read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkAsRead(message.id)}
                        className="gap-1"
                      >
                        <Check className="w-4 h-4" />
                        {t('admin.messages.markRead')}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(message.id)}
                      className="text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Message Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Message Details
            </DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[hsl(var(--wood-dark))] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {selectedMessage.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-[hsl(var(--wood-dark))]">
                    {selectedMessage.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[hsl(var(--beige))] rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                <a
                  href={`tel:${selectedMessage.phone}`}
                  className="flex items-center gap-2 text-[hsl(var(--wood-dark))] font-medium"
                >
                  <Phone className="w-4 h-4" />
                  {selectedMessage.phone}
                </a>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Message</p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-[hsl(var(--wood-dark))]">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <a
                  href={`https://wa.me/${selectedMessage.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full btn-primary gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Reply on WhatsApp
                  </Button>
                </a>
                <Button
                  variant="outline"
                  onClick={() => setIsDetailOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
