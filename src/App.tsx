import { Stage, Layer, Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import { useStrictMode } from 'react-konva';
import table from './assets/table.png';
import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';

function App() {
  useStrictMode(true);

  const [x, setX] = useState<number>(55);
  const [y, setY] = useState<number>(55);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [image] = useImage(table);

  const shapeRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (selectedShapeId && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedShapeId]);

  const checkDeselect = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>,
  ): void => {
    const clickedOnEmpty: boolean = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedShapeId(null);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', justifyContent: 'center' }}>
      <Stage
        width={window.innerWidth - 400}
        height={window.innerHeight - 180}
        style={{ backgroundColor: '#000D2D', borderRadius: '16px' }}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
          <Image
            id="1"
            ref={shapeRef}
            image={image}
            width={80}
            height={80}
            x={x}
            y={y}
            draggable
            onDragEnd={(e) => {
              setX(e.target.x());
              setY(e.target.y());
            }}
            onClick={() => {
              setSelectedShapeId('1');
            }}
            onTap={() => {
              setSelectedShapeId('1');
            }}
            onTransformEnd={(e) => {
              setX(e.target.x());
              setY(e.target.y());
            }}
          />
          {selectedShapeId === '1' && (
            <Transformer
              ref={trRef}
              centeredScaling={true}
              rotationSnaps={[0, 90, 180, 270]}
              resizeEnabled={false}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}

export default App;
