interface SVGPreviewProps {
  svg: string;
}

export function SVGPreview({ svg }: SVGPreviewProps) {
  const handleClick = () => {
    const w = window.open('');
    w?.document.write(svg);
  };

  return (
    <div class="space-y-2">
      <div 
        onClick={handleClick}
        class="cursor-pointer hover:shadow-lg transition-shadow duration-200"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <p class="text-sm text-gray-500">
        Click the SVG to view in full screen
      </p>
    </div>
  );
}