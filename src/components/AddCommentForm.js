import {useState} from 'react';
import useUser from '../hooks/useUser'
import axios from 'axios';

const AddCommentForm = ({articleId, onArticleUpdated}) => {
  const [name, setName] = useState('');
  const [commentText, setCommentText] = useState('');
  const { user } = useUser();

  const addComment = async () => {
    const token = user && await user.getIdToken();
    const headers = token ? {authtoken: token} : {};
    const res = await axios.post(`/api/articles/${articleId}/comments`,{
      postBy:name,
      text: commentText
    }, {headers})
    onArticleUpdated(res.data);
    setName('');
    setCommentText('');
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