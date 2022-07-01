import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingCommments] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsFetchingCommments(true);
      fetch('/api/comments/' + eventId)
        .then((res) => res.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingCommments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending comment ...',
      nessage: 'Your comment is being stored',
      status: 'pending'
    });
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Something whent wrong');
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          nessage: 'Your comment was saved',
          status: 'success'
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error ...',
          nessage: error.nessage || 'Something whent wrong!',
          status: 'error'
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>...is Loading</p>}
    </section>
  );
}

export default Comments;
