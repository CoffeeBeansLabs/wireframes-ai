interface SVGDisplayProps {
  content: string;
}

export function SVGDisplay({ content }: SVGDisplayProps) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}