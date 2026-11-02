import { useState } from 'react';

function CommentsSystem() {
    const [comments, setComments] = useState([
        {
            id: 1,
            author: 'John Doe',
            content: 'This is a great post!',
            timestamp: new Date('2024-01-15T10:30:00'),
            likes: 5,
            replies: [
                {
                    id: 2,
                    author: 'Jane Smith',
                    content: 'I totally agree!',
                    timestamp: new Date('2024-01-15T11:00:00'),
                    likes: 2,
                    replies: []
                }
            ]
        },
        {
            id: 3,
            author: 'Bob Wilson',
            content: 'Thanks for sharing this information.',
            timestamp: new Date('2024-01-15T12:00:00'),
            likes: 3,
            replies: []
        }
    ]);

    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');

    const addComment = () => {
        if (newComment.trim()) {
            const comment = {
                id: Date.now(),
                author: 'Current User',
                content: newComment,
                timestamp: new Date(),
                likes: 0,
                replies: []
            };

            setComments(prev => [...prev, comment]);
            setNewComment('');
        }
    };

    const addReply = (parentId) => {
        if (replyContent.trim()) {
            const reply = {
                id: Date.now(),
                author: 'Current User',
                content: replyContent,
                timestamp: new Date(),
                likes: 0,
                replies: []
            };

            const addReplyToComment = (comments) => {
                return comments.map(comment => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            replies: [...comment.replies, reply]
                        };
                    } else if (comment.replies.length > 0) {
                        return {
                            ...comment,
                            replies: addReplyToComment(comment.replies)
                        };
                    }

                    return comment;
                });
            };

            setComments(prev => addReplyToComment(prev));
            setReplyContent('');
            setReplyingTo(null);
        }
    };

    const likeComment = (commentId) => {
        const updateLikes = (comments) => {
            return comments.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        likes: comment.likes + 1
                    };
                } else if (comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: updateLikes(comment.replies)
                    };
                }

                return comment;
            });
        };

        setComments(prev => updateLikes(prev));
    };

