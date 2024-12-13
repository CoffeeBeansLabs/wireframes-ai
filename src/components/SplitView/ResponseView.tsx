import { ShimmerEffect } from '../ui/ShimmerEffect';
import { SVGPreview } from '../SVG/SVGPreview';
import type { Message } from '../../types';

interface ResponseViewProps {
  isLoading: boolean;
  messages: Message[];
}

export function ResponseView({ isLoading, messages }: ResponseViewProps) {
  return (
    <div className="grid grid-cols-2 gap-8 p-8 flex-1 max-w-8xl mx-auto">
      {/* Response Section */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Response</h2>
        {isLoading ? (
          <ShimmerEffect />
        ) : (
          <div className="prose prose-lg max-w-none">
            {messages[0]?.content.response}
          </div>
        )}
      </div>

      {/* Preview Section */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Preview</h2>
        {isLoading ? (
          <ShimmerEffect />
        ) : (
          <div className="space-y-8">
            {messages[0]?.content.preview.map((svg, index) => (
              <SVGPreview 
                key={index}
                svg={svg}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}