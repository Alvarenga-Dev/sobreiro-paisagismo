"use client";

import Image from "next/image";
import { useState } from "react";
import type { AboutVideoContent } from "../aboutContent";

type AboutVideoPlayerProps = Pick<AboutVideoContent, "id" | "playerTitle" | "poster">;

function focusPlayer(player: HTMLIFrameElement | null) {
  player?.focus();
}

export function AboutVideoPlayer({ id, playerTitle, poster }: AboutVideoPlayerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="aboutVideoPlayer">
      {loaded ? (
        <iframe
          ref={focusPlayer}
          className="aboutVideoPlayer__frame"
          title={playerTitle}
          src={`https://www.youtube-nocookie.com/embed/${id}?playsinline=1&hl=pt-BR`}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <Image className="aboutVideoPlayer__poster" {...poster} alt={poster.alt} />
          <button
            type="button"
            className="buttonLink aboutVideoPlayer__load"
            onClick={() => setLoaded(true)}
          >
            <span aria-hidden="true">▶</span> Carregar vídeo
          </button>
        </>
      )}
    </div>
  );
}
