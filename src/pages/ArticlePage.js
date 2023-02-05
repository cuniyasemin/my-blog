import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import articles from '../article-content';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm'
import useUser from '../hooks/useUser'
import axios from 'axios';
const ArticlePage = () => {
  const { articleId } = useParams();
  const { user, isLoading } = useUser();
  const [articleInfo, setArticleInfo] = useState({
    upvote: 0,
    comments: []
  });

  const loadArticleInfo = async () => {
    const token = user && await user.getIdToken();
    const headers = token ? {authtoken: token} : {};
    const response = await axios.get(`/api/articles/${articleId}`,{ headers });
    setArticleInfo(response.data);
  }

  useEffect(() => {
    loadArticleInfo();
  }, [])
  
  const addUpvote = async () => {
    const token = user && await user.getIdToken();
    const headers = token ? {authtoken: token} : {};
    debugger
    const response = await axios.put(`/api/articles/${articleId}/upvote`, null, {headers})
    setArticleInfo(response.data);
  }

  const article = articles.find((item) => item.name === articleId);

  if (!article) {
    return <NotFoundPage/>
  }
  
  return (
    <>
      <h1>{article?.title}</h1>
      <div className='upvotes-section'>
        { user ? (
          <button onClick={addUpvote}>Upvote</button>
        ) : (
          <button > Log in to upvote </button>
        )

        }
        <p>This article has {articleInfo.upvote} upvote(s)</p>
      </div>
      { article?.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))
      }
      { user ? (
        <AddCommentForm articleId={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
      ) : (
        <button>Log in to add a comment</button>
      )}

      <CommentsList comments={articleInfo.comments}/>

    </>
  )
}
export default ArticlePage;
