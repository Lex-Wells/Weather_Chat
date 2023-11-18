import React from 'react'
import Lottie from 'lottie-react'
import camp from "../frontend/src/lottie/camp.json"

const HomeBg = () => {
    return (
        <div className="lottie-background">
          <Lottie
            animationData={camp}
            loop={true}
            autoplay={true}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      );
}

export default HomeBg