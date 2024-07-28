import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";

const VideoCarousel = () => {

    const vidoRef = useRef([]);
    const vidoeSpanRef = useRef([]);
    const vidoeDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false  // fixed typo
    });

    const [loadingData, setloadedData] = useState([]);
    const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;



    useGSAP(() => {

        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: "power2.inOut"
        });


        gsap.to("#video", {
            scrollTrigger: {
                trigger: '#video',
                toggleActions: "restart none none none"
            },
            onComplete: () => {
                setVideo((prev) => ({
                    ...prev, startPlay: true, isPlaying: true
                }));
            }
        });
    }, [isEnd, videoId]);

    useEffect(() => {
        let curretProgress = 0;
        let span = vidoeSpanRef.current;
        if (span[videoId]) {
            let anim = gsap.to(span[videoId], {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                    if (progress !== curretProgress) {
                        curretProgress = progress;

                        gsap.to(vidoeDivRef.current[videoId], {
                            width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw'
                        });
                        gsap.to(span[videoId], {
                            width: `${curretProgress}%`,
                            backgroundColor: 'white'
                        });
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(vidoeDivRef.current[videoId], {
                            width: '12px'
                        });
                        gsap.to(span[videoId], {
                            backgroundColor: '#afafa'
                        });
                    }
                }
            });

            if (videoId === 0) {
                anim.restart();
            }

            const animUpdate = () => {
                anim.progress(vidoRef.current[videoId].currentTime /
                    hightlightsSlides[videoId].videoDuration);
            };

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }
        }
    }, [videoId, startPlay]);

    useEffect(() => {
        if (loadingData.length > 3) {
            if (!isPlaying) {
                vidoRef.current[videoId].pause();
            } else {
                startPlay && vidoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadingData]);

    
    const handleProcess = (type, i) => {
        switch (type) {
            case "video-end":
                setVideo((pre) => ({
                    ...pre, isEnd: true,
                    videoId: i + 1
                }));
                break;
            case "video-last":
                setVideo((pre) => ({
                    ...pre, isLastVideo: true,
                }));
                break;
            case "video-reset":
                setVideo((pre) => ({
                    ...pre, isLastVideo: false,
                    videoId: 0
                }));
                break;
            case "pause":
                setVideo((pre) => ({
                    ...pre, isPlaying: !pre.isPlaying
                }));
                break;
            case "play":
                setVideo((pre) => ({
                    ...pre, isPlaying: !pre.isPlaying,
                }));
                break;
            default:
                return video;
        }
    };

    const handleLoadeloadeMetadata = (i, e) => setloadedData((pre) => [...pre, e]);

    return (
        <>
            <div className="flex items-center ">
                {hightlightsSlides.map((item, i) => (
                    <div key={item.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video
                                    id="video"
                                    playsInline={true}
                                    preload="auto"
                                    muted
                                    ref={(el) => (vidoRef.current[i] = el)}
                                    onPlay={() => {
                                        setVideo((pre) => ({
                                            ...pre, isPlaying: true
                                        }));
                                    }}
                                    className={`${item.id === 2 && 'translate-x-44'} pointer-events-none`}
                                    onEnded={() =>
                                        i !== 3
                                            ? handleProcess('video-end', i)
                                            : handleProcess("video-last")
                                    }
                                    onLoadedMetadata={(e) => handleLoadeloadeMetadata(i, e)}
                                >
                                    <source src={item.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {item.textLists.map((text, i) => (
                                    <p key={i} className="md:text-2xl text-xl font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative flex flex-center mt-10">
                <div className="flex flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {vidoRef.current.map((_, i) =>
                        <span key={i}
                            ref={el => vidoeDivRef.current[i] = el}
                            className="mx-2 w-3 h-3 bg-gray-200 relative cursor-pointer rounded-full"
                        >
                            <span className="absolute h-full w-full rounded-full"
                                ref={(el) => (vidoeSpanRef.current[i] = el)}
                            />
                        </span>
                    )}
                </div>
                <button className="control-btn"
                    onClick={
                        isLastVideo
                            ? () => handleProcess("video-reset")
                            : !isPlaying
                                ? () => handleProcess("play")
                                : () => handleProcess('pause')
                    }
                >
                    <img src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;
