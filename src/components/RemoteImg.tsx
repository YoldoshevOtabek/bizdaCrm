import { Avatar, Image } from "antd";
import type { AvatarProps, ImageProps } from "antd";
import type { ImgHTMLAttributes } from "react";
import { useRemoteSrc } from "../hooks/useRemoteSrc";

type RemoteImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallback?: string;
};

export default function RemoteImg({
  src,
  fallback,
  alt = "",
  ...props
}: RemoteImgProps) {
  const resolved = useRemoteSrc(typeof src === "string" ? src : undefined, fallback);

  return <img src={resolved || fallback} alt={alt} {...props} />;
}

export function RemotePreview({ src, ...props }: ImageProps) {
  const resolved = useRemoteSrc(typeof src === "string" ? src : undefined);
  return <Image {...props} src={resolved} />;
}

export function RemoteAvatar(props: AvatarProps) {
  const resolved = useRemoteSrc(typeof props.src === "string" ? props.src : undefined);
  return <Avatar {...props} src={resolved} />;
}
