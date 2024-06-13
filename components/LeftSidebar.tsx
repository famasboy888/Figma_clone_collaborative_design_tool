"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { getShapeInfo } from "@/lib/utils";

const LeftSidebar = ({
  allShapes,
  handleLayerClick,
  selectedShapeId,
}: {
  allShapes: Array<any>;
  handleLayerClick: Function;
  selectedShapeId: string | null;
}) => {
  // memoize the result of this function so that it doesn't change on every render but only when there are new shapes
  const memoizedShapes = useMemo(
    () => (
      <section className="flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20">
        <h3 className="border border-primary-grey-200 px-5 py-4 text-xs uppercase">
          Layers
        </h3>
        <div className="flex flex-col">
          {allShapes.map((shape: any) => {
            const info = getShapeInfo(shape[1]?.type);
            const shapeIndex = shape[1]?.zIndex;

            return (
              <div
                key={shape[1]?.objectId}
                className={`group my-1 flex items-center gap-2 px-5 py-2.5 hover:cursor-pointer hover:bg-primary-green hover:text-primary-black ${
                  selectedShapeId === shape[1]?.objectId
                    ? "bg-primary-green text-primary-black"
                    : ""
                }`}
                onClick={() => handleLayerClick(shape)}
              >
                <Image
                  src={info?.icon}
                  alt="Layer"
                  width={16}
                  height={16}
                  className={`group-hover:invert ${
                    selectedShapeId === shape[1]?.objectId ? "invert" : ""
                  }`}
                />
                <h3 className="text-sm font-semibold capitalize">
                  {info.name} {shapeIndex > -1 && `${shapeIndex}`}
                </h3>
              </div>
            );
          })}
        </div>
      </section>
    ),
    [allShapes, handleLayerClick, selectedShapeId]
  );

  return memoizedShapes;
};

export default LeftSidebar;
