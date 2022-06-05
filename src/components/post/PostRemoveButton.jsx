import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import DefaultButton from "../common/buttons/DefaultButton";
import useNotifications from "../../hooks/useNotifications";
import usePostRemoval from "../../hooks/queries/posts/usePostRemoval";

const PostRemoveButton = ({ post }) => {
  const navigate = useNavigate();

  const { notifySuccess } = useNotifications();

  const postRemoveMutation = usePostRemoval();

  const handlePostRemoveButtonClick = useCallback(() => {
    postRemoveMutation.mutate(post, {
      onSuccess: () => {
        notifySuccess({ content: `블로그 포스트[${post.title}]가 삭제되었습니다.` });
        navigate(`/@${post.author}`, { replace: true });
      }
    });
  }, [post]);

  return (
    <DefaultButton disabled={postRemoveMutation.isLoading} onClick={handlePostRemoveButtonClick}>
      삭제
    </DefaultButton>
  );
};

PostRemoveButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired
};

export default memo(PostRemoveButton);
