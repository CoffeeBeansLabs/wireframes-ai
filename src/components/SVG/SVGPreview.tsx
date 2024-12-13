import { useState } from 'preact/hooks';
import { Modal } from '../Modal/Modal';

interface SVGPreviewProps {
  svg: string;
  index: number;
}

export function SVGPreview({ svg, index }: SVGPreviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer max-w-full overflow-hidden"
      >
        <div 
          className="w-full max-h-[300px] overflow-hidden flex items-center justify-center"
          dangerouslySetInnerHTML={{ 
            __html: svg.replace(
              /<svg/, 
              '<svg style="transform: scale(0.75);" preserveAspectRatio="xMidYMid meet"'
            ) 
          }}
        />
        <p className="text-sm text-gray-500 mt-2 text-center">
          Click to view full size
        </p>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Wireframe Preview {index + 1}</h3>
          <div 
            className="max-h-[80vh] overflow-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      </Modal>
    </>
  );
}