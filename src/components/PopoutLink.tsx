import React, { ReactNode } from "react";

interface Props {
  to: string;
  children: ReactNode;
}

const PopoutLink: React.FC<Props> = ({ to, children, ...rest }: Props) => {
  // rel="noopener" is for some security reasons:
  // https://web.dev/external-anchors-use-rel-noopener/
  return (
    <a href={to} target="_blank" rel="noreferrer" tabIndex={-1} {...rest}>
      {children}
    </a>
  );
};

export default PopoutLink;
