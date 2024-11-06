'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { formatDistanceToNow } from 'date-fns';
import { client } from '@/sanity/lib/client';

interface Comment {
  _id: string;
  name: string;
  comment: string;
  createdAt: string;
}

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchComments() {
      try {
        const fetchedComments = await client.fetch(`
          *[_type == "comment" && post._ref == $postId && approved == true] | order(createdAt desc) {
            _id,
            name,
            comment,
            createdAt
          }
        `, { postId });
        setComments(fetchedComments);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    }

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, comment, postId }),
      });

      if (response.ok) {
        toast({
          title: 'Comment submitted',
          description: 'Your comment is awaiting moderation.',
        });
        setName('');
        setEmail('');
        setComment('');
      } else {
        throw new Error('Failed to submit comment');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit comment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Existing Comments */}
      {comments.length > 0 && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{comment.name}</h3>
                  <time className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </time>
                </div>
                <p className="text-muted-foreground whitespace-pre-wrap">{comment.comment}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Comment Form */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Leave a Comment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={50}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              minLength={10}
              maxLength={1000}
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Comment'}
          </Button>
        </form>
      </Card>
    </div>
  );
}