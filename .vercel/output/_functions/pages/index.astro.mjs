/* empty css                                 */
import { c as createComponent, r as renderTemplate, a as addAttribute, b as renderHead, e as renderSlot, f as createAstro, g as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BQkXfctE.mjs';
import 'kleur/colors';
import 'clsx';
import { useState, useEffect } from 'preact/hooks';
import { jsxs, jsx, Fragment } from 'preact/jsx-runtime';
import { signal } from '@preact/signals';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="manifest" href="/site.webmanifest"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/darshak/Projects/cb/wireframes-ai/src/layouts/Layout.astro", void 0);

function FormField({
  label,
  htmlFor,
  required,
  optional,
  children
}) {
  return jsxs("div", {
    children: [jsxs("label", {
      htmlFor,
      class: "block text-sm font-medium text-gray-700 mb-2",
      children: [label, optional && jsx("span", {
        class: "text-gray-500 ml-1",
        children: "(optional)"
      })]
    }), children]
  });
}

function LoadingButton({
  isLoading,
  loadingText = "Generating...",
  children
}) {
  return jsx("button", {
    type: "submit",
    disabled: isLoading,
    className: "w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center",
    children: isLoading ? jsxs(Fragment, {
      children: [jsxs("svg", {
        className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        children: [jsx("circle", {
          className: "opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "4"
        }), jsx("path", {
          className: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        })]
      }), loadingText]
    }) : children
  });
}

function ErrorMessage({
  message
}) {
  if (!message) return null;
  return jsx("div", {
    class: "bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg",
    children: message
  });
}

function ProjectForm({
  onSubmit,
  isLoading
}) {
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const projectName = formData.get("projectName");
    if (!projectName?.trim()) {
      setError("User Journey is required");
      return;
    }
    const projectBrief = formData.get("projectBrief");
    if (!projectBrief?.trim()) {
      setError("User Journey is required");
      return;
    }
    const userPersona = formData.get("userPersona");
    const userJourney = formData.get("userJourney");
    if (!userJourney?.trim()) {
      setError("User Journey is required");
      return;
    }
    const requestPayload = {
      initialInput: {
        projectName,
        projectBrief,
        userPersona,
        userJourney
      }
    };
    setError(null);
    onSubmit(requestPayload);
  };
  return jsxs("form", {
    onSubmit: handleSubmit,
    class: "max-w-4xl space-y-6 transition-all duration-300",
    children: [jsx(FormField, {
      label: "Project Name",
      htmlFor: "projectName",
      children: jsx("input", {
        type: "text",
        id: "projectName",
        name: "projectName",
        required: true,
        class: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary",
        placeholder: "Enter project name"
      })
    }), jsx(FormField, {
      label: "Project Brief",
      htmlFor: "projectBrief",
      children: jsx("textarea", {
        id: "projectBrief",
        name: "projectBrief",
        rows: 3,
        required: true,
        class: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary",
        placeholder: "Brief description of the project"
      })
    }), jsx(FormField, {
      label: "User Persona (optional)",
      htmlFor: "userPersona",
      children: jsx("textarea", {
        id: "userPersona",
        name: "userPersona",
        rows: 3,
        class: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary",
        placeholder: "Describe your target user"
      })
    }), jsx(FormField, {
      label: "User Journey",
      htmlFor: "userJourney",
      required: true,
      children: jsx("textarea", {
        id: "userJourney",
        name: "userJourney",
        rows: 4,
        required: true,
        class: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary",
        placeholder: "Describe the user journey"
      })
    }), error && jsx(ErrorMessage, {
      message: error
    }), jsx(LoadingButton, {
      isLoading,
      children: "Generate Wireframes"
    })]
  });
}

signal([]);

const API_BASE_URL = "/api";
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.details || `HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
async function generateWireframe(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to generate wireframe. Please try again.");
  }
}

function PromptForm({
  onSubmit,
  isLoading
}) {
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const prompt = formData.get("prompt");
    if (!prompt.trim()) return;
    setError(null);
    try {
      onSubmit(prompt);
      form.reset();
    } catch (error2) {
      const errorMessage = error2 instanceof Error ? error2.message : "An unexpected error occurred";
      setError(errorMessage);
    }
  };
  return jsxs("form", {
    onSubmit: handleSubmit,
    class: "relative max-w-4xl mx-auto",
    children: [error && jsx("div", {
      class: "absolute -top-12 left-0 right-0 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg",
      children: error
    }), jsxs("div", {
      class: "flex gap-4",
      children: [jsx("textarea", {
        name: "prompt",
        placeholder: "Ask a follow-up question...",
        required: true,
        disabled: isLoading,
        class: "flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 transition-all disabled:bg-gray-50 disabled:text-gray-500"
      }), jsx("button", {
        type: "submit",
        disabled: isLoading,
        class: "h-10 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 rounded-lg transition-all duration-200 flex items-center justify-center whitespace-nowrap",
        children: isLoading ? jsxs(Fragment, {
          children: [jsxs("svg", {
            class: "animate-spin -ml-1 mr-2 h-4 w-4 text-white",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            children: [jsx("circle", {
              class: "opacity-25",
              cx: "12",
              cy: "12",
              r: "10",
              stroke: "currentColor",
              "stroke-width": "4"
            }), jsx("path", {
              class: "opacity-75",
              fill: "currentColor",
              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            })]
          }), "Sending..."]
        }) : "Send"
      })]
    })]
  });
}

function SplitView() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [conversationId, setConversationId] = useState();
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    const {
      assistantMessage,
      currentConversationId
    } = await generateWireframe(formData);
    setIsLoading(false);
    setShowResponse(true);
    setConversationId(currentConversationId);
    const newMessage = {
      role: "assistant",
      content: {
        response: assistantMessage.content[0].input.explanation,
        preview: assistantMessage.content[0].input.wireframes
      }
    };
    setMessages([newMessage]);
  };
  const handleMessageSent = async (prompt) => {
    try {
      setIsLoading(true);
      const userMessage = {
        role: "user",
        content: {
          response: prompt
        }
      };
      setMessages((prev) => [...prev, userMessage]);
      const requestBody = conversationId ? {
        subsequentMessage: prompt,
        conversationId
      } : {
        initialInput: prompt
      };
      const {
        assistantMessage,
        currentConversationId
      } = await generateWireframe(requestBody);
      if (currentConversationId !== conversationId) {
        setConversationId(currentConversationId);
      }
      console.log(assistantMessage);
      const newMessage = {
        role: "assistant",
        content: {
          response: assistantMessage.content[0].input.explanation,
          preview: assistantMessage.content[0].input.wireframes
        }
      };
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return jsx("div", {
    class: "transition-all duration-500",
    children: !showResponse ? jsx("div", {
      class: "animate-fade-out",
      children: jsx(ProjectForm, {
        onSubmit: handleFormSubmit,
        isLoading
      })
    }) : jsxs("div", {
      class: "space-y-6 grid grid-cols-2 gap-6",
      children: [jsx("div", {
        class: "flex flex-col gap-6 max-w-6xl bg-white rounded-lg p-6 animate-slide-in",
        children: messages.map((message, index) => jsx("div", {
          class: `prose max-w-none ${message.role === "assistant" ? "bg-gray-100 p-8 rounded-r-3xl rounded-tl-3xl mb-4 mr-12" : "bg-indigo-100 text-indigo-900 w-fit rounded-l-3xl rounded-tr-3xl text-right p-4 ml-auto"}`,
          dangerouslySetInnerHTML: {
            __html: message.content.response
          }
        }, index))
      }), jsx("div", {
        class: "flex flex-col gap-6 space-y-6 bg-white rounded-lg p-6 animate-slide-in",
        children: messages.filter((m) => m.role == "assistant").at(-1)?.content.preview?.map((screen, index) => jsxs("div", {
          class: "flex flex-col gap-4",
          children: [jsx("p", {
            class: "font-semibold",
            children: screen.title
          }), jsx("div", {
            class: "wireframe-container border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200",
            dangerouslySetInnerHTML: {
              __html: screen.image
            }
          }, index)]
        }))
      }), jsx("div", {
        class: "sticky col-span-2 bottom-0 bg-white border-t p-4 animate-slide-up",
        children: jsx(PromptForm, {
          onSubmit: handleMessageSent,
          isLoading
        })
      })]
    })
  });
}

function Logo() {
  return jsxs("div", {
    class: "flex items-center justify-center gap-2",
    children: [jsx("h1", {
      class: "text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark",
      children: "AI Wireframe Generator"
    }), jsx("span", {
      class: "text-3xl",
      children: "✨"
    })]
  });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "AI Wireframe Generator" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100"> <div class="w-max mx-auto px-4 py-8"> <div class="text-center mb-8 p-4"> ${renderComponent($$result2, "Logo", Logo, {})} <p class="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
Transform your ideas into visual designs. Describe your application flow and let AI generate professional wireframes for you.
</p> </div> <div class="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8"> ${renderComponent($$result2, "SplitView", SplitView, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/darshak/Projects/cb/wireframes-ai/src/components/SplitView", "client:component-export": "SplitView" })} </div> <div class="text-center mt-8 text-sm text-gray-500">
Powered by <a href="https://claude.ai" class="text-primary hover:text-primary-dark">Claude AI</a> </div> </div> </main> ` })} `;
}, "/Users/darshak/Projects/cb/wireframes-ai/src/pages/index.astro", void 0);

const $$file = "/Users/darshak/Projects/cb/wireframes-ai/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
