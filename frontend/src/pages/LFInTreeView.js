import React from 'react';
import Styled from 'styled-components/macro';
import ReactFamilyTree from 'react-family-tree';
import LFCard from '../components/LFCard';
import LFToolkit from '../components/LFToolkit';

const ZOOM_AMOUNT = 0.1;
const ZOOM_MAX = 1;
const ZOOM_MIN = 0.1;
const WIDTH = 600;
const HEIGHT = 600;

const StyledSection = Styled.div`
    width: 100%;
    height: 100%;

    overflow: hidden;
`;

const StyledFamilyContainer = Styled.div`
    display: flex;
    justify-content: flex-start;

    width: 100%;
    height: 100%;

    overflow: auto;

    cursor: ${(props) => props.cursor};
    touch-action: none;
`;

const StyledFamilyTree = Styled.div`
    width: fit-content;
    height: fit-content;

    transform: scale(${(props) => props.scale}, ${(props) => props.scale});
`;

const StyledCardWrapper = Styled.div`
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    width: ${WIDTH}px;
    height: ${HEIGHT}px;

    transform: translate(${(props) => `${props.x}px, ${props.y}px`});
    font-size: 2rem;

    * {
        box-sizing: border-box;
    }
`;


function LFInTreeView(props) {

  const ref = React.useRef(null);
  const [scale, setScale] = React.useState(0.4);
  const [rootId, setRootId] = React.useState(props.dataRootId);
  const [nodes, setNodes] = React.useState(props.newPeopleList);
  const { onScreeDown, clicked } = useScrollHandlers(ref);
  const { scrollToCenter, zoomIn, zoomOut } = useToolkitHandlers(ref, scale, setScale);

  React.useEffect(() => {

    scrollToCenter();
  }, [rootId]);

  return (
    <StyledSection>
      <StyledFamilyContainer
        ref={ref}
        onPointerDown={onScreeDown}
        cursor={clicked ? 'grabbing' : 'grab'}>
        <StyledFamilyTree scale={scale}>
          <ReactFamilyTree
            nodes={nodes}
            rootId={rootId}
            width={WIDTH}
            height={HEIGHT}
            renderNode={(info) => (
              <StyledCardWrapper
                key={info.id}
                x={info.left * (WIDTH / 2)}
                y={info.top * (HEIGHT / 2)}>
                  <MemberCard
                    info={info}
                    onCardClick={() => {}}
                    />
              </StyledCardWrapper>
            )}
          />
        </StyledFamilyTree>
      </StyledFamilyContainer>
      <LFToolkit
        scrollToCenter={scrollToCenter}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      />
    </StyledSection>

  );

};

export default LFInTreeView;

const StyledMemberCard = Styled.div`
    position relative;
`;

const MemberCard = ({ info, onCardClick }) => {
    return (
        <StyledMemberCard>
            <LFCard info={info} onClick={onCardClick} />
        </StyledMemberCard>
    );
};



function useScrollHandlers(ref) {
  const [clicked, setClicked] = React.useState(false);
  const [scrollPos, setScrollPos] = React.useState({x: 0, y: 0, left: 0, top: 0});

  const setElementScroll = (e) => {
      const { current } = ref;
      if (!current) {
          return;
      }

      if (!clicked) {
          return;
      }

      const { x, y, top, left } = scrollPos;
      // Scroll the element
      current.scrollLeft = left - (e.clientX - x);
      current.scrollTop = top - (e.clientY - y);
  };
  const disableClicked = () => {
      setClicked(false);
  };

  React.useEffect(() => {
      document.addEventListener('pointerup', disableClicked);
      document.addEventListener('pointermove', setElementScroll);

      return () => {
          document.removeEventListener('pointerup', disableClicked);
          document.removeEventListener('pointermove', setElementScroll);
      };
  }, [clicked]);

  return {
      onScreeDown: (e) => {
          e.preventDefault();

          setClicked(true);
          setScrollPos({
              x: e.pageX,
              y: e.pageY,
              left: e.currentTarget.scrollLeft,
              top: e.currentTarget.scrollTop,
          });
      },
      clicked,
  };
}

function useToolkitHandlers(ref, scale, setScale) {
  const scrollToCenter = () => {
      const { current: element } = ref;
      if (!element) {
          return;
      }

      const { x, y } = getScrollCenterPos(element);
      element.scrollTo(x, y);
  };

  const zoomIn = () => {
      let newScale = scale + ZOOM_AMOUNT;
      if (newScale >= ZOOM_MAX) {
          newScale = ZOOM_MAX;
      }

      setScale(newScale);
  };

  const zoomOut = () => {
      let newScale = scale - ZOOM_AMOUNT;
      if (newScale <= ZOOM_MIN) {
          newScale = ZOOM_MIN;
      }

      setScale(newScale);
  };

  return {
      scrollToCenter,
      zoomIn,
      zoomOut,
  };
}

function getScrollCenterPos(element) {
  const width = element.firstElementChild.offsetWidth;
  const height = element.firstElementChild.offsetHeight;

  return {
      x: (width - element.offsetWidth) / 2,
      y: (height - element.offsetHeight) / 2,
  };
}
