import { useState } from 'preact/hooks';
import { SVGPreview } from './SVGPreview';

interface ResponseViewProps {
  content: {
    response: string;
    preview: string[];
  };
}

export function ResponseView({ content }: ResponseViewProps) {
  const [activeTab, setActiveTab] = useState<'response' | 'preview'>('preview');
  
  return (
    <div class="space-y-4">
      <div class="flex justify-end">
        <div class="flex items-center p-1 bg-indigo-100 rounded-full w-fit">
          <button
            onClick={() => setActiveTab('response')}
            class={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              activeTab === 'response'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-black'
            }`}
          >
            Response
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            class={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              activeTab === 'preview'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-black'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      <div class="prose prose-lg max-w-none">
        {activeTab === 'preview' ? (
          <div class="space-y-8">
            {Array.isArray(content.preview) ? content.preview.map((svg, index) => (
              <SVGPreview key={index} svg={svg} />
            )) : (
              <SVGPreview svg={content.preview} />
            )}
          </div>
        ) : (
          <div class="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
            {content.response}
          </div>
        )}
      </div>
    </div>
  );
}
