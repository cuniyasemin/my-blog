import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import articles from '../article-content';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm'
import axios from 'axios';
const ArticlePage = () => {
  const { articleId } = useParams();
  const [articleInfo, setArticleInfo] = useState({
    upvote: 0,
    comments: []
  });

  const loadArticleInfo = async () => {
    await axios.get(`/api/articles/${articleId}`).then((response) => {
      setArticleInfo(response.data);
    });
  }

  useEffect(() => {
    loadArticleInfo();
  }, [])
  
  const addUpvote = async () => {
    await axios.put(`/api/articles/${articleId}/upvote`).then((response) => {
      setArticleInfo(response.data);
    });
  }

  const article = articles.find((item) => item.name === articleId);

  if (!article) {
    return <NotFoundPage/>
  }
  
  return (
    <>
      <h1>{article?.title}</h1>
      <div className='upvotes-section'>
        <button onClick={addUpvote}>Upvote</button>
        <p>This article has {articleInfo.upvote} upvote(s)</p>
      </div>
      { article?.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))
      }
      <CommentsList comments={articleInfo.comments}/>

      <AddCommentForm articleId={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
    </>
  )
}
export default ArticlePage;
