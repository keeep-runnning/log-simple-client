import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Flex, Textarea } from "@chakra-ui/react";

export default function PostPublicationForm() {
  const navigate = useNavigate();

  const editorRef = useRef();

  const handleGoBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <Flex as="form" direction="column" rowGap={4}>
      <ButtonGroup size="sm" justifyContent="flex-end">
        <Button type="button" onClick={handleGoBackButtonClick}>
          뒤로가기
        </Button>
        <Button colorScheme="main" type="submit" loadingText="글 발행 중...">
          글 발행하기
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
