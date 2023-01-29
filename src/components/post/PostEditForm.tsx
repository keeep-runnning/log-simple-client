import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import { Button, ButtonGroup, Flex, Textarea } from "@chakra-ui/react";

type PostEditFormProps = {
  post: {
    id: number;
    title: string;
    content: string;
  };
  onClose: () => void;
};

export default function PostEditForm({ post, onClose }: PostEditFormProps) {
  const editorRef = useRef<Editor>(null);

  return (
    <Flex as="form" direction="column" rowGap={4}>
      <ButtonGroup size="sm" justifyContent="flex-end">
        <Button type="button" onClick={onClose}>
          나가기
        </Button>
        <Button type="submit" colorScheme="main" loadingText="수정 중...">
          글 수정하기
        </Button>
      </ButtonGroup>
      <Textarea
        fontSize="2xl"
        resize="none"
        placeholder="제목을 입력하세요"
        rows={1}
        variant="flushed"
      />
      <Editor
        initialValue={post.content}
        autofocus={false}
        ref={editorRef}
        height="720px"
        previewStyle="vertical"
        initialEditType="wysiwyg"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "link"],
          ["code", "codeblock"],
        ]}
        useCommandShortcut={true}
        usageStatistics={false}
      />
    </Flex>
  );
}