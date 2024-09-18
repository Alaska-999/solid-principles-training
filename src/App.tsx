import * as React from "react";
import * as ReactDOM from "react-dom";
import "./App.css";

type VideoDetails = {
  previewUrl: string;
  title: string;
  author: string;
};

type StreamDetails = VideoDetails & { watching: number };

const loadVideoDetails = (id: string): Promise<VideoDetails> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          previewUrl:
            "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
          title: "Cat Video",
          author: "@Cat",
        }),
      500
    )
  );
};

const loadStreamDetails = (id: string): Promise<StreamDetails> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          previewUrl:
            "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg",
          title: "Cat Stream",
          author: "@Cat",
          watching: 12000,
        }),
      500
    )
  );
};

const useVideoDetails = (videoId: string): VideoDetails => {
  const [videoDetails, setVideoDetails] = React.useState<VideoDetails>({
    previewUrl: "",
    title: "Loading...",
    author: "",
  });

  React.useEffect(() => {
    loadVideoDetails(videoId).then((vd) => setVideoDetails(vd));
  }, [videoId]);

  return videoDetails;
};

const useStreamDetails = (videoId: string): StreamDetails => {
  const [streamDetails, setStreamDetails] = React.useState<StreamDetails>({
    previewUrl: "",
    title: "Loading...",
    author: "",
    watching: 0,
  });

  React.useEffect(() => {
    loadStreamDetails(videoId).then((sd) => setStreamDetails(sd));
  }, [videoId]);

  return streamDetails;
};

const VideoPreviewImage = ({
  videoDetails,
}: {
  videoDetails: VideoDetails;
}) => {
  return (
    <img
      style={{ width: "200px", borderRadius: "10px", border: "1px solid" }}
      src={videoDetails.previewUrl}
      alt={"video-preview"}
    />
  );
};

const VideoDescription = ({ videoDetails }: { videoDetails: VideoDetails }) => {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>{videoDetails.title}</div>
      <div style={{ color: "#808080" }}>{videoDetails.author}</div>
    </>
  );
};

const StreamDescriprion = ({
  videoDetails,
}: {
  videoDetails: StreamDetails;
}) => {
  return (
    <>
      <VideoDescription videoDetails={videoDetails} />
      <div style={{ color: "#808080" }}>{videoDetails.watching} watching</div>
      <span style={{ color: "white", background: "red", padding: "3px" }}>
        live
      </span>
    </>
  );
};

const Loader = ({}) => <span>{"loading..."}</span>;

// (anything that extends VideoDetails)
type VideoPreviewProps<T extends VideoDetails> = {
  videoId: string;
  ImagePreviewComponent?: React.FunctionComponent<{ videoDetails: T }>;
  DescriptionComponent?: React.FunctionComponent<{ videoDetails: T }>;
  LoaderComponent?: React.FunctionComponent<{}>;
};

//HOC - gets function and returns component
const getVideoPreview =
  <T extends VideoDetails>(videoDetailsGetter: (videoId: string) => T) =>
  ({
    videoId,
    ImagePreviewComponent = VideoPreviewImage,
    DescriptionComponent = VideoDescription,
    LoaderComponent = Loader,
  }: VideoPreviewProps<T>) => {
    const videoDetails = videoDetailsGetter(videoId);

    return videoDetails ? (
      <div style={{ display: "flex" }}>
        <ImagePreviewComponent videoDetails={videoDetails} />
        <div style={{ paddingLeft: "10px" }}>
          <DescriptionComponent videoDetails={videoDetails} />
        </div>
      </div>
    ) : (
      <LoaderComponent />
    );
  };

const VideoPreview = getVideoPreview(useVideoDetails);
const StreamPreview = getVideoPreview(useStreamDetails);

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <VideoPreview videoId={"testVideo"} />
      <br />
      <StreamPreview
        videoId={"teststream"}
        DescriptionComponent={StreamDescriprion}
      />
    </div>
  );
}

export default App;
