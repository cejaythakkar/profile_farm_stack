import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

export default function CompleteStickyEditor({ innerRef, onChange }) {
  console.log('name', name);
  const editor = useEditor({
    extensions: [StarterKit],
    content: ``,
    onUpdate: onChange,
    editorProps: {
      attributes: {
        // LAYER 3: Typing area fills the bottom zone and handles its own scrollbar
        class:
          'flex-1 min-h-[300px] overflow-y-auto p-5 focus:outline-none bg-gray-900 text-gray-100 ' +
          // 🏷️ Fix Headings Styles
          '[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-2 ' +
          '[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-2 ' +
          '[&_h3]:text-xl  [&_h3]:font-bold [&_h3]:mb-2 [&_h3]:mt-1 ' +
          // 📝 Fix Lists Styles
          '[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:ml-6 [&_ol]:ml-6 [&_li]:pl-1' +
          '[&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500 [&_blockquote] pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-300',
      },
    },
  });

  if (!editor) return null;
  useEffect(() => {
    if (editor) {
      innerRef.current = editor;
    }
  }, [editor]);

  // Helper function to build a unified button component with active states
  const ToolbarButton = ({ onClick, isActive, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2.5 py-1 text-xs font-semibold rounded border transition-colors ${
        isActive
          ? 'bg-indigo-600 border-indigo-500 text-white'
          : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
    </button>
  );

  return (
    // LAYER 1: Bounding outer container
    <div className="flex-1 w-full flex flex-col border border-gray-700 rounded overflow-hidden bg-gray-900 shadow-xl">
      {/* STICKY TOOLBAR: flex-none ensures it stays fixed; flex-wrap handles small screens */}
      <div className="flex-none sticky top-0 bg-gray-800 border-b border-gray-700 p-2 flex flex-wrap gap-1.5 items-center">
        {/* Inline Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          B
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          I
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          title="Strikethrough"
        >
          S
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive('code')}
          title="Inline Code"
        >
          &lt;/&gt;
        </ToolbarButton>
        <div className="h-5 w-[1px] bg-gray-700 mx-1" /> {/* Divider */}
        {/* Headings */}
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
          title="Normal Text"
        >
          Txt
        </ToolbarButton>
        <div className="h-5 w-[1px] bg-gray-700 mx-1" /> {/* Divider */}
        {/* Blocks & Structure */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          1. List
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Quote"
        >
          “ ”
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          Block {}
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          isActive={false}
          title="Horizontal Line"
        >
          —
        </ToolbarButton>
        <div className="h-5 w-[1px] bg-gray-700 mx-1" /> {/* Divider */}
        {/* History / Utilities */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          isActive={false}
          title="Undo (Ctrl+Z)"
        >
          ↶
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          isActive={false}
          title="Redo (Ctrl+Y)"
        >
          ↷
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
          isActive={false}
          title="Clear Formatting"
        >
          Clear
        </ToolbarButton>
      </div>

      {/* LAYER 2: Auto-injected Tiptap space */}
      <EditorContent
        name={name}
        editor={editor}
        className="flex-1 min-h-0 flex flex-col overflow-hidden"
      />
    </div>
  );
}
