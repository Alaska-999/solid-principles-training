import * as React from "react";
import * as ReactDOM from "react-dom";
import "./App.css";

type VideoDetails = {
  previewUrl: string;
  title: string;
  author: string;
};

type StreamDetails = VideoDetails & { watching: number };

const loadVideoDetails = (
  id: string
): Promise<VideoDetails | StreamDetails> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        id.includes("stream")
          ? resolve({
              previewUrl:
                "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
              title: "Cat Stream",
              author: "@Cat",
              watching: 12000,
            })
          : resolve({
              previewUrl:
                "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
              title: "Cat Video",
              author: "@Cat",
            }),

      500
    )
  );
};

const VideoPreview = ({ videoId }: { videoId: string }) => {
  const [videoDetails, setVideoDetails] = React.useState<
    VideoDetails | StreamDetails
  >();

  React.useEffect(() => {
    loadVideoDetails(videoId).then((vd) => setVideoDetails(vd));
  }, []);

  return videoDetails ? (
    <div style={{ display: "flex" }}>
      <img
        style={{ width: "200px", borderRadius: "10px", border: "1px solid" }}
        src={videoDetails.previewUrl}
        alt={"video-preview"}
      />
      <div style={{ paddingLeft: "10px" }}>
        <div style={{ fontWeight: "bold" }}>{videoDetails.title}</div>
        <div style={{ color: "#808080" }}>{videoDetails.author}</div>
        {"watching" in videoDetails && (
          <>
            <div style={{}}>{videoDetails.watching}</div>
            <span style={{ color: "white", background: "red", padding: "3px" }}>
              live
            </span>
          </>
        )}
      </div>
    </div>
  ) : (
    <span>{"loading..."}</span>
  );
};

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <VideoPreview videoId={"testVideo"} />
      <br />
      <VideoPreview videoId={"teststream"} />
    </div>
  );
}

export default App;
