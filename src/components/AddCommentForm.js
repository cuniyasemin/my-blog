import {useState} from 'react';
import axios from 'axios';

const AddCommentForm = ({articleId, onArticleUpdated}) => {
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');

  const addComment = async () => {
    await axios.post(`/api/articles/${articleId}/comments`,{
      postBy:name,
      text: commentText
    }).then((res) => {
      onArticleUpdated(res.data);
      setName('');
      setCommentText('');
    });
  }

  return (
    <div id='add-comment-form'>
      <h3>Add a comment</h3>
      <label>
        Name: 
        <input value={name} onChange={e => setName(e.target.value)} type='text'/>
      </label>
      <label>
        Comment: 
        <textarea rows='4' cols='50' value={commentText} onChange={e => setCommentText(e.target.value)}/>
      </label>
      <button onClick={addComment}>Add Comment</button>
    </div>
  )
}

export default AddCommentForm