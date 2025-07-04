import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";


interface VideoPlayerProps {
    url: string;
}

const VideoPlayer = ({url}: VideoPlayerProps) => {
    const playerRef = useRef<ReactPlayer>(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [playbackRate, setPlaybackRate] = useState(1.0);

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="w-full max-w-4xl mx-auto aspect-video rounded overflow-hidden mb-6">
                <ReactPlayer
                    ref={playerRef}
                    url={url}
                    playing={playing}
                    volume={volume}
                    playbackRate={playbackRate}
                    controls
                    width="100%"
                    height="100%"
                />
            </div>

            <div className="border p-1 mt-4 flex flex-wrap items-center gap-4 text-sm">
                <button
                    onClick={() => setPlaying(!playing)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {playing? "Pause": "Play"}
                </button>

                <label>
                    Volume: {" "}
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                    />
                </label>

                <label>
                    Speed: {" "}
                    <select
                        value={playbackRate}
                        onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                    >
                        <option value={0.5}>x0.5</option>
                        <option value={1.0}>x1.0</option>
                        <option value={1.25}>x1.25</option>
                        <option value={1.5}>x1.5</option>
                        <option value={1.75}>x1.75</option>
                        <option value={2.0}>x2.0</option>
                    </select>
                </label>
            </div>
        </div>
    );

};

export default VideoPlayer