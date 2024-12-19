import React, { useEffect, useState } from 'react';
import { Comment } from "../models/models";
import { AuthService } from '../Services/AuthService';
import { toast } from 'react-toastify';

interface CommentProps {
  comment: {
    id: number;
    text: string;
    parentCommentId: number | null;
    userId: number;
    childComments: Comment[];
  };
  onAddChildComment: (parentCommentId: number, text: string) => void;
}

const CommentComponent: React.FC<CommentProps> = ({ comment, onAddChildComment }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [userName, setUserName] = useState<string>("");

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(event.target.value);
  };

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onAddChildComment(comment.id, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

useEffect(()=>{
  const getUserName = async (userId: number) => {
    try{
      var userName = await AuthService.getUserName(userId);
      setUserName(userName)
    }
    catch(e){
      toast.error("user not found");
      console.log(e)
    }
  }
  getUserName(comment.userId);
  },[])

  return (
    <div className="comment">
      <div className="comment-header">
        <span>User:  <span style={{ color: 'black', fontSize: "20px", marginLeft: "10px" }}>{userName}</span></span>
      </div>
      <div className="comment-body">{comment.text}</div>
      
      {/* Кнопка для ответа на комментарий */}
      <button className="reply-button" onClick={handleReplyClick}>Ответить</button>
      
      {/* Форма для ввода ответа, если на комментарий нажали "Ответить" */}
      {isReplying && (
       <div className="reply-area">
       <textarea 
         className="reply-area-input"
         value={replyText}
         onChange={handleInputChange}
         placeholder="Напишите ваш ответ..."
         rows="3" // Устанавливаем начальное количество строк
       />
       <button className="submit-reply-button" onClick={handleReplySubmit}>Отправить</button>
     </div>
      )}

      {/* Дочерние комментарии */}
      {comment.childComments.length > 0 && (
        <div className="comment-children">
          {comment.childComments.map((child) => (
            <CommentComponent key={child.id} comment={child} onAddChildComment={onAddChildComment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentComponent;