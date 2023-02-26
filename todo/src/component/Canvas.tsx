import { useState, useEffect, useRef } from 'react';

const cords: any = []
const Canvas = () => {
    const canvas = useRef<HTMLCanvasElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | any>();
    const [file, setFile] = useState<string>();
    useEffect(() => {
        if (null !== canvas.current) {
            setCtx(canvas.current.getContext('2d'));
            canvas.current.addEventListener("click", clickHandler, false);
        }
        return () => {
            if (null !== canvas.current)
                canvas.current.removeEventListener("click", clickHandler, false);
        }
    });

    const clickHandler = (e: MouseEvent) => {
        mouse_pos(e);
        draw();
    }

    const draw = () => {
        if (ctx) {
            ctx.fillStyle = 'rgba(0,0,0, 0.3)';
            ctx.beginPath();
            for (let i: number = 0; i < cords.length; i++) {
                if (i === 0)
                    ctx.moveTo(cords[i].x, cords[i].y);
                else
                    ctx.lineTo(cords[i].x, cords[i].y);

            }
            ctx.closePath();
            ctx.fill();
        }
    }

    const mouse_pos = (e: MouseEvent) => {

        let offsetX = 0, offsetY = 0;
        if (canvas.current) {
            offsetX = canvas.current.offsetLeft;
            offsetY = canvas.current.offsetTop;
            cords.push({ x: e.pageX - offsetX, y: e.pageY - offsetY })
        }


    }

    const clearCanvas = () => {
        ctx.clearRect(0, 0, 400, 400);
        cords.length = 0;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files)
            setFile(URL.createObjectURL(e.currentTarget.files[0]));

    }
    const drawImage = () => {
        clearCanvas();
        if (null !== imageRef.current) {
            let actualWidth = imageRef.current.naturalWidth;
            let actualHeight = imageRef.current.naturalHeight;

            ctx.drawImage(imageRef.current, 0, 0, actualWidth, actualHeight, 0, 0, 400, 400)
        }
    }
    return (
        <>
            <canvas ref={canvas} width="400" height="400" style={{ border: "1px solid black" }}></canvas>
            <br />
            <input type="file" onChange={(e) => handleChange(e)} /> <button className="btn btn-dark" onClick={() => clearCanvas()}>Clear</button>
            <br />
            <img ref={imageRef} src={file} style={{ width: "200px", height: "200px" }} />
            <br />
            <button className="btn btn-primary mt-3" onClick={() => drawImage()}>Draw to Canvas</button>
        </>
    )
}

export default Canvas;