import { FC, PropsWithChildren } from "react";
import "./Container.scss";

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
