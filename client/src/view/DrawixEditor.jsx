import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const API = import.meta.env.VITE_BACKEND_URL;

const DrawixEditor = () => {

  // =========================
  // STATES
  // =========================

  const [files, setFiles] = useState([
    {
      name: "drawix.txt",
      content: "",
    },
  ]);

  const [activeFile, setActiveFile] =
    useState("drawix.txt");

  const [showModal, setShowModal] =
    useState(false);

  const [showResultModal, setShowResultModal] =
    useState(false);

  const [fileName, setFileName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [debugData, setDebugData] =
    useState(null);

  // =========================
  // CURRENT FILE
  // =========================

  const currentFile = files.find(
    (file) => file.name === activeFile
  );

  // =========================
  // CREATE FILE
  // =========================

  const createNewFile = () => {

    if (!fileName.trim()) {
      alert("Enter file name");
      return;
    }

    const alreadyExists = files.find(
      (file) =>
        file.name === `${fileName}.txt`
    );

    if (alreadyExists) {
      alert("File already exists");
      return;
    }

    const newFile = {
      name: `${fileName}.txt`,
      content: "",
    };

    setFiles((prev) => [
      ...prev,
      newFile,
    ]);

    setActiveFile(`${fileName}.txt`);

    setFileName("");

    setShowModal(false);
  };

  // =========================
  // UPDATE CODE
  // =========================

  const updateCode = (value) => {

    const updatedFiles = files.map(
      (file) => {

        if (file.name === activeFile) {

          return {
            ...file,
            content: value || "",
          };
        }

        return file;
      }
    );

    setFiles(updatedFiles);
  };

  // =========================
  // COPY CODE
  // =========================

  const copyCode = async () => {

    try {

      await navigator.clipboard.writeText(
        debugData.fixedCode
      );

      alert("Code Copied 🚀");

    } catch (error) {

      console.log(error);

    }
  };

  // =========================
  // CREATE FIXED FILE
  // =========================

  const createFixedFile = () => {

    if (!debugData?.fixedCode)
      return;

    const fixedFile = {
      name: `fixed-${activeFile}`,
      content:
        debugData.fixedCode,
    };

    setFiles((prev) => [
      ...prev,
      fixedFile,
    ]);

    setActiveFile(
      `fixed-${activeFile}`
    );

    setShowResultModal(false);
  };

  // =========================
  // CLEAN RESPONSE
  // =========================

  const cleanResponse = (text) => {

    return text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  };

  // =========================
  // DEBUG
  // =========================

  const handleDebug = async () => {

    try {

      setLoading(true);

      let code =
        currentFile?.content;

      const response =
        await axios.post(
          `${API}/debug`,
          {
            _userCode: code,
          },
          {
            withCredentials: true,
          }
        );

      const cleaned =
        cleanResponse(
          response.data.data[0].result
        );

      const result =
        JSON.parse(cleaned);

      setDebugData(result);

      setShowResultModal(true);

    } catch (error) {

      console.log(error);

      alert("Debug Failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="h-screen w-screen bg-[#0f0f0f] flex overflow-hidden">

      {/* ========================= */}
      {/* SIDEBAR */}
      {/* ========================= */}

      <div className="w-[260px] bg-[#111111] border-r border-gray-800 flex flex-col">

        {/* Logo */}
        <div className="h-[7vh] flex items-center justify-between px-6 border-b border-gray-800">

          <h1 className="text-white text-3xl font-bold">
            Dx
          </h1>

          {/* Add File */}
          <button
            onClick={() =>
              setShowModal(true)
            }
            className="text-gray-400 hover:text-white transition"
          >
            <i className="ri-add-line text-2xl"></i>
          </button>
        </div>

        {/* Explorer */}
        <div className="p-3">

          <p className="text-gray-500 text-[11px] uppercase tracking-[3px] mb-4">
            Explorer
          </p>

          {/* Folder */}
          <div>

            {/* Folder Name */}
            <div className="flex items-center gap-2 text-gray-300 text-sm px-2 py-1 rounded-md">

              <i className="ri-arrow-down-s-line text-gray-500"></i>

              <i className="ri-folder-3-fill text-yellow-400"></i>

              <span>drawix</span>
            </div>

            {/* Files */}
            <div className="ml-7 mt-1 flex flex-col gap-1">

              {files.map(
                (file, index) => {

                  const extension =
                    file.name
                      .split(".")
                      .pop();

                  return (
                    <div
                      key={index}
                      onClick={() =>
                        setActiveFile(
                          file.name
                        )
                      }
                      className={`flex items-center justify-between px-2 py-2 rounded-md cursor-pointer transition

                      ${
                        activeFile ===
                        file.name
                          ? "bg-[#1b1b1b]"
                          : "hover:bg-[#1a1a1a]"
                      }`}
                    >

                      {/* Left */}
                      <div className="flex items-center gap-2 overflow-hidden">

                        <i className="ri-file-code-line text-purple-400"></i>

                        <span className="text-gray-200 text-sm truncate">
                          {file.name}
                        </span>
                      </div>

                      {/* Extension */}
                      <span className="text-[10px] uppercase bg-[#2a2a2a] text-gray-400 px-2 py-[2px] rounded-md">
                        {extension}
                      </span>
                    </div>
                  );
                }
              )}

            </div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* MAIN */}
      {/* ========================= */}

      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="h-[7vh] bg-black border-b border-gray-800 flex items-center px-6">

          <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-t-lg border border-gray-800">

            <i className="ri-file-code-line text-purple-400"></i>

            <span className="text-gray-300 text-sm">
              {activeFile}
            </span>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 relative">

          <Editor
            height="100%"
            width="100%"
            language="javascript"
            theme="vs-dark"
            value={
              currentFile?.content
            }
            onChange={updateCode}
            options={{
              fontSize: 18,
              fontFamily:
                "Fira Code",
              fontLigatures: true,
              automaticLayout: true,

              minimap: {
                enabled: false,
              },

              scrollBeyondLastLine: false,

              padding: {
                top: 20,
              },

              cursorBlinking:
                "smooth",

              smoothScrolling: true,
            }}
          />

          {/* Debug Button */}
          <button
            onClick={handleDebug}
            disabled={loading}
            className="absolute bottom-6 right-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300"
          >
            <i className="ri-bug-line text-xl"></i>

            {
              loading
                ? "Debugging..."
                : "Debug"
            }
          </button>
        </div>
      </div>

      {/* ========================= */}
      {/* CREATE FILE MODAL */}
      {/* ========================= */}

      {
        showModal && (

          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="w-[400px] bg-[#151515] border border-gray-800 rounded-2xl p-6">

              {/* Header */}
              <div className="flex items-center justify-between mb-5">

                <h2 className="text-white text-xl font-semibold">
                  Create New File
                </h2>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="text-gray-400 hover:text-white"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              {/* Input */}
              <input
                type="text"
                placeholder="Enter file name..."
                value={fileName}
                onChange={(e) =>
                  setFileName(
                    e.target.value
                  )
                }
                className="w-full bg-[#0f0f0f] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white transition"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    createNewFile
                  }
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* ========================= */}
      {/* RESULT MODAL */}
      {/* ========================= */}

      {
        showResultModal &&
        debugData && (

          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">

            <div className="w-full max-w-7xl h-[92vh] bg-[#121212] border border-gray-800 rounded-3xl overflow-hidden flex flex-col">

              {/* Header */}
              <div className="h-[80px] border-b border-gray-800 flex items-center justify-between px-8">

                <div>

                  <h1 className="text-white text-2xl font-bold">
                    Debug Result
                  </h1>

                  <p className="text-gray-400 text-sm mt-1">
                    {
                      debugData.summary
                    }
                  </p>
                </div>

                <button
                  onClick={() =>
                    setShowResultModal(
                      false
                    )
                  }
                  className="text-gray-400 hover:text-white"
                >
                  <i className="ri-close-line text-3xl"></i>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-8">

                {/* Top Stats */}
                <div className="grid grid-cols-4 gap-5 mb-8">

                  <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-gray-800">
                    <p className="text-gray-400 text-sm">
                      Language
                    </p>

                    <h2 className="text-white text-xl font-semibold mt-2">
                      {
                        debugData.language
                      }
                    </h2>
                  </div>

                  <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-gray-800">
                    <p className="text-gray-400 text-sm">
                      Total Issues
                    </p>

                    <h2 className="text-red-400 text-xl font-semibold mt-2">
                      {
                        debugData.totalIssues
                      }
                    </h2>
                  </div>

                  <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-gray-800">
                    <p className="text-gray-400 text-sm">
                      Time Complexity
                    </p>

                    <h2 className="text-yellow-400 text-xl font-semibold mt-2">
                      {
                        debugData.complexity
                          ?.time
                      }
                    </h2>
                  </div>

                  <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-gray-800">
                    <p className="text-gray-400 text-sm">
                      Space Complexity
                    </p>

                    <h2 className="text-green-400 text-xl font-semibold mt-2">
                      {
                        debugData.complexity
                          ?.space
                      }
                    </h2>
                  </div>
                </div>

                {/* Errors */}
                {
                  debugData.errors
                    ?.length > 0 && (

                    <div className="mb-10">

                      <h2 className="text-red-400 text-2xl font-semibold mb-5">
                        Errors
                      </h2>

                      <div className="flex flex-col gap-5">

                        {
                          debugData.errors.map(
                            (
                              error,
                              index
                            ) => (

                              <div
                                key={index}
                                className="bg-[#1a1a1a] border border-red-500/20 rounded-2xl p-5"
                              >

                                <div className="flex items-start justify-between">

                                  <div>

                                    <h3 className="text-red-400 text-lg font-semibold">
                                      {
                                        error.title
                                      }
                                    </h3>

                                    <p className="text-gray-400 mt-2">
                                      {
                                        error.description
                                      }
                                    </p>
                                  </div>

                                  <span className="bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded-full">
                                    {
                                      error.severity
                                    }
                                  </span>
                                </div>
                              </div>
                            )
                          )
                        }
                      </div>
                    </div>
                  )
                }

                {/* Best Practices */}
                {
                  debugData.bestPractices
                    ?.length > 0 && (

                    <div className="mb-10">

                      <h2 className="text-cyan-400 text-2xl font-semibold mb-5">
                        Best Practices
                      </h2>

                      <div className="flex flex-col gap-3">

                        {
                          debugData.bestPractices.map(
                            (
                              item,
                              index
                            ) => (

                              <div
                                key={index}
                                className="bg-[#1a1a1a] border border-cyan-500/20 rounded-xl p-4 text-gray-300 flex items-start gap-3"
                              >
                                <i className="ri-check-line text-cyan-400 text-lg"></i>

                                <p>
                                  {
                                    item
                                  }
                                </p>
                              </div>
                            )
                          )
                        }
                      </div>
                    </div>
                  )
                }

                {/* Changes Made */}
                {
                  debugData.changesMade
                    ?.length > 0 && (

                    <div className="mb-10">

                      <h2 className="text-purple-400 text-2xl font-semibold mb-5">
                        Changes Made
                      </h2>

                      <div className="flex flex-col gap-3">

                        {
                          debugData.changesMade.map(
                            (
                              item,
                              index
                            ) => (

                              <div
                                key={index}
                                className="bg-[#1a1a1a] border border-purple-500/20 rounded-xl p-4 text-gray-300 flex items-start gap-3"
                              >
                                <i className="ri-edit-line text-purple-400 text-lg"></i>

                                <p>
                                  {
                                    item
                                  }
                                </p>
                              </div>
                            )
                          )
                        }
                      </div>
                    </div>
                  )
                }

                {/* Fixed Code */}
                <div>

                  <div className="flex items-center justify-between mb-5">

                    <h2 className="text-green-400 text-2xl font-semibold">
                      Fixed Code
                    </h2>

                    <button
                      onClick={
                        copyCode
                      }
                      className="bg-[#1a1a1a] hover:bg-[#222] text-white px-5 py-2 rounded-xl flex items-center gap-3"
                    >
                      <i className="ri-file-copy-line"></i>

                      Copy Code
                    </button>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-gray-800">

                    <SyntaxHighlighter
                      language={
                        debugData.language
                      }
                      style={
                        vscDarkPlus
                      }
                      customStyle={{
                        margin: 0,
                        padding:
                          "25px",
                        fontSize:
                          "14px",
                        background:
                          "#0d0d0d",
                      }}
                      showLineNumbers={
                        true
                      }
                      wrapLongLines={
                        true
                      }
                    >
                      {
                        debugData.fixedCode
                      }
                    </SyntaxHighlighter>

                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="h-[90px] border-t border-gray-800 flex items-center justify-end px-8 gap-4">

                <button
                  onClick={() =>
                    setShowResultModal(
                      false
                    )
                  }
                  className="px-6 py-3 rounded-2xl bg-gray-700 hover:bg-gray-600 text-white transition"
                >
                  Close
                </button>

                <button
                  onClick={
                    createFixedFile
                  }
                  className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-700 text-white transition flex items-center gap-3"
                >
                  <i className="ri-file-add-line"></i>

                  Create Fixed File
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default DrawixEditor;