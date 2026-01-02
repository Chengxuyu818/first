/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-11-23 14:47:13
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-11-23 23:38:52
 * @FilePath: \react_11_16\jike\src\components\Article\components\ReactQuillEditor\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { Editor, EditorState, convertToRaw } from "draft-js"; // 1. 引入 convertToRaw
import "draft-js/dist/Draft.css";
import React from "react";

// 2. 接收 props
export default function MyDraftEditor(props) {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );

    const editor = React.useRef(null);

    function focusEditor() {
        editor.current.focus();
    }

    // 3. 定义一个处理变化的函数
    const handleEditorChange = (newEditorState) => {
        // 更新本地状态
        setEditorState(newEditorState);

        // 关键步骤：将内容转换为字符串并通过 onChange 传递给父组件
        if (typeof props.onChange === 'function') {
            const contentState = newEditorState.getCurrentContent();
            const contentAsString = JSON.stringify(convertToRaw(contentState));
            props.onChange(contentAsString);
        }
    };

    return (
        <div
            style={{ border: "1px solid #d9d9d9", minHeight: "12em", cursor: "text", padding: "0.5em" }}
            onClick={focusEditor}
        >
            {/* 4. 将 onChange 指向我们新定义的函数 */}
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={handleEditorChange} // 不再直接使用 setEditorState
                placeholder="请输入文章内容..."
            />
        </div>
    );
}