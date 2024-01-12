import { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import { type Option } from "artplayer/types/option";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import Hls from "hls.js";

type Selector = {
  default?: boolean;
  html: string;
  value: number;
};
export default function Player({
  option,
  getInstance,
  artRef,
  ...rest
}: {
  option: Option;
  getInstance?: (art: Artplayer) => void;
  artRef: any;
  [key: string]: any;
}) {
  useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: artRef.current!,
      controls: [
        {
          name: "playbackRate",
          position: "left",
          width: 400,
          index: 100,
          html: '<p style="font-size: 20px; font-weight: bold">1.0x</p>',
          selector: [
            {
              default: true,
              html: '<p style="font-size: 20px; font-weight: bold">1.0x</p>',
              // @ts-ignore
              value: 1,
            },
            {
              html: '<p style="font-size: 20px; font-weight: bold">1.25x</p>',
              // @ts-ignore
              value: 1.25,
            },
            {
              html: '<p style="font-size: 20px; font-weight: bold">1.50x</p>',
              // @ts-ignore
              value: 1.5,
            },
            {
              html: '<p style="font-size: 20px; font-weight: bold">1.75x</p>',
              // @ts-ignore
              value: 1.75,
            },
            {
              html: '<p style="font-size: 20px; font-weight: bold">2.0x</p>',
              // @ts-ignore
              value: 2,
            },
          ],
          onSelect: function (item, $dom) {
            // @ts-ignore
            art.playbackRate = item.value;
            // @ts-ignore
            console.log(item.value);
            return item.html;
          },
        },
      ],
      plugins: [
        artplayerPluginHlsQuality({
          // Show quality in control
          control: true,

          // Get the resolution text from level
          getResolution: (level) => {
            if (level.height <= 240) {
              return "240P";
            } else if (level.height > 240 && level.height <= 360) {
              return "360P";
            } else if (level.height > 360 && level.height <= 480) {
              return "480P";
            } else if (level.height > 480 && level.height <= 720) {
              return "720P";
            } else if (level.height > 720 && level.height <= 1080) {
              return "1080P";
            } else {
              return level.height + "P";
            }
          },
        }),
      ],
      customType: {
        m3u8: function playM3u8(video, url, art) {
          if (Hls.isSupported()) {
            if (art.hls) art.hls.destroy();
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            art.hls = hls;
            art.on("destroy", () => hls.destroy());
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
          } else {
            art.notice.show = "Unsupported playback format: m3u8";
          }
        },
      },
    });
    art.on("ready", () => {
      art.play();
    });
    if (getInstance && typeof getInstance === "function") {
      getInstance(art);
    }

    art.events.proxy(document, "keypress", (event: any) => {
      // Check if the focus is on an input field or textarea
      const isInputFocused =
        document?.activeElement?.tagName === "INPUT" ||
        document?.activeElement?.tagName === "TEXTAREA";

      if (!isInputFocused && event?.code === "Space") {
        event.preventDefault();
        art.playing ? art.pause() : art.play();
      } else if (!isInputFocused && event?.code === "KeyF") {
        event.preventDefault();
        art.fullscreen = !art.fullscreen;
      }
    });

    art.controls.remove("playAndPause");
    console.log("ready", art.controls);
    art.controls.update({
      name: "volume",
      position: "right",
    });
    art.on("ready", () => {
      console.log("ready", option.url);
    });
    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, []);

  return <div ref={artRef} {...rest}></div>;
}
