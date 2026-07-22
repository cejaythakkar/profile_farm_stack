import React, { useRef, useEffect } from 'react';
import RteInput from './RteInput';
import { useFormikContext } from 'formik';

const FormikRichTextEditor = ({
  name,
  text,
  placeholder = 'Enter Value',
  required = false,
  noLabel = false,
  defaultValue = '',
  hideHandler = () => {},
}) => {
  const { setFieldValue } = useFormikContext();
  const editorRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // 💡 Access the tiptap editor instance via your ref safely
    const editor = editorRef.current;

    if (editor && defaultValue && !isInitialized.current) {
      editor.commands.setContent(defaultValue);
      isInitialized.current = true; // Mark as initialized so updates don't overwrite typing
    }
  }, [defaultValue, editorRef.current]);
  return (
    <>
      <RteInput
        name={name}
        text={text}
        placeholder={placeholder}
        noLabel={noLabel}
        required
        innerRef={editorRef}
        onChange={() => {
          const richTextContent = editorRef?.current?.getHTML?.() || '';
          setFieldValue(name, richTextContent);
        }}
      />
    </>
  );
};

export default FormikRichTextEditor;
