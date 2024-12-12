interface MessageTextProps {
  content: string;
}

export function MessageText({ content }: MessageTextProps) {
  return (
    <p class="message-text">
      {content.split('\n').map((line, i) => (
        <span key={i}>
          {line}
          {i < content.split('\n').length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}