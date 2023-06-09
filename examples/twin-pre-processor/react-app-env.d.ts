/// <reference types="react_scripts" />

declare namespace React {
  interface Attributes {
    /** display: block */
    block?: boolean;
    /** display: inline */
    inline?: boolean;
    /** display: inline */
    inlineBlock?: boolean;
    /** display: flex */
    flex?: boolean;
    /** display: grid */
    grid?: boolean;
    /** display: contents */
    contents?: boolean;
    /** display: hidden */
    hidden?: boolean;

    /** flex-direction: column; (ONLY with "flex") */
    col?: boolean;
    /**
     * "with col": items-center  (align-items: center;)
     * "without": justify-center (justify-content: center;)
     * (ONLY "flex" )
     * */
    center?: boolean;

    /**  justify-between */
    between?: boolean;
    /**  contents */
    contents?: boolean;

    /**  position: static */
    static?: boolean;
    /**  position: absolute */
    absolute?: boolean;
    /**  position: relative */
    relative?: boolean;
    /**  position: fixed */
    fixed?: boolean;
    /**  position: sticky */
    sticky?: boolean;

    /** gap: 0px; */
    gap0?: boolean;
    /** column-gap: 0px; */
    gapX0?: boolean;
    /** row-gap: 0px; */
    gapY0?: boolean;
    /** gap: 1px; */
    gapPx?: boolean;
    /** column-gap: 1px; */
    gapX_px?: boolean;
    /** row-gap: 1px; */
    gapY_px?: boolean;
    /** gap: 0.125rem; = 2px */
    gap0_5?: boolean;
    /** column-gap: 0.125rem; = 2px */
    gapX0_5?: boolean;
    /** row-gap: 0.125rem; = 2px */
    gapY0_5?: boolean;
    /** gap: 0.25rem; = 4px */
    gap1?: boolean;
    /** column-gap: 0.25rem; = 4px */
    gapX1?: boolean;
    /** row-gap: 0.25rem; = 4px */
    gapY1?: boolean;
    /** gap: 0.375rem; = 6px */
    gap1_5?: boolean;
    /** column-gap: 0.375rem; = 6px */
    gapX1_5?: boolean;
    /** row-gap: 0.375rem; = 6px */
    gapY1_5?: boolean;
    /** gap: 0-5rem; = 8px */
    gap2?: boolean;
    /** column-gap: 0-5rem; = 8px */
    gapX2?: boolean;
    /** row-gap: 0-5rem; = 8px */
    gapY2?: boolean;
    /** gap: 0.625rem; = 10px */
    gap2_5?: boolean;
    /** column-gap: 0.625rem; = 10px */
    gapX2_5?: boolean;
    /** row-gap: 0.625rem; = 10px */
    gapY2_5?: boolean;
    /** gap: 0.75rem; = 12px */
    gap3?: boolean;
    /** column-gap: 0.75rem; = 12px */
    gapX3?: boolean;
    /** row-gap: 0.75rem; = 12px */
    gapY3?: boolean;
    /** gap: 0.875rem; = 14px */
    gap3_5?: boolean;
    /** column-gap: 0.875rem; = 14px */
    gapX3_5?: boolean;
    /** row-gap: 0.875rem; = 14px */
    gapY3_5?: boolean;
    /** gap: 1rem; = 16px */
    gap4?: boolean;
    /** column-gap: 1rem; = 16px */
    gapX4?: boolean;
    /** row-gap: 1rem; = 16px */
    gapY4?: boolean;
    /** gap: 1.25rem; = 20px */
    gap5?: boolean;
    /** column-gap: 1.25rem; = 20px */
    gapX5?: boolean;
    /** row-gap: 1.25rem; = 20px */
    gapY5?: boolean;
    /** gap: 1-5rem; = 24px */
    gap6?: boolean;
    /** column-gap: 1-5rem; = 24px */
    gapX6?: boolean;
    /** row-gap: 1-5rem; = 24px */
    gapY6?: boolean;
    /** gap: 1.75rem; = 28px */
    gap7?: boolean;
    /** column-gap: 1.75rem; = 28px */
    gapX7?: boolean;
    /** row-gap: 1.75rem; = 28px */
    gapY7?: boolean;
    /** gap: 2rem; = 32px */
    gap8?: boolean;
    /** column-gap: 2rem; = 32px */
    gapX8?: boolean;
    /** row-gap: 2rem; = 32px */
    gapY8?: boolean;
    /** gap: 2.25rem; = 36px */
    gap9?: boolean;
    /** column-gap: 2.25rem; = 36px */
    gapX9?: boolean;
    /** row-gap: 2.25rem; = 36px */
    gapY9?: boolean;
    /** gap: 2-5rem; = 40px */
    gap10?: boolean;
    /** column-gap: 2-5rem; = 40px */
    gapX10?: boolean;
    /** row-gap: 2-5rem; = 40px */
    gapY10?: boolean;
    /** gap: 2.75rem; = 44px */
    gap11?: boolean;
    /** column-gap: 2.75rem; = 44px */
    gapX11?: boolean;
    /** row-gap: 2.75rem; = 44px */
    gapY11?: boolean;
    /** gap: 3rem; = 48px */
    gap12?: boolean;
    /** column-gap: 3rem; = 48px */
    gapX12?: boolean;
    /** row-gap: 3rem; = 48px */
    gapY12?: boolean;
    /** gap: 3-5rem; = 56px */
    gap14?: boolean;
    /** column-gap: 3-5rem; = 56px */
    gapX14?: boolean;
    /** row-gap: 3-5rem; = 56px */
    gapY14?: boolean;
    /** gap: 4rem; = 64px */
    gap16?: boolean;
    /** column-gap: 4rem; = 64px */
    gapX16?: boolean;
    /** row-gap: 4rem; = 64px */
    gapY16?: boolean;
    /** gap: 5rem; = 80px */
    gap20?: boolean;
    /** column-gap: 5rem; = 80px */
    gapX20?: boolean;
    /** row-gap: 5rem; = 80px */
    gapY20?: boolean;
    /** gap: 6rem; = 96px */
    gap24?: boolean;
    /** column-gap: 6rem; = 96px */
    gapX24?: boolean;
    /** row-gap: 6rem; = 96px */
    gapY24?: boolean;
    /** gap: 7rem; = 112px */
    gap28?: boolean;
    /** column-gap: 7rem; = 112px */
    gapX28?: boolean;
    /** row-gap: 7rem; = 112px */
    gapY28?: boolean;
    /** gap: 8rem; = 128px */
    gap32?: boolean;
    /** column-gap: 8rem; = 128px */
    gapX32?: boolean;
    /** row-gap: 8rem; = 128px */
    gapY32?: boolean;
    /** gap: 9rem; = 144px */
    gap36?: boolean;
    /** column-gap: 9rem; = 144px */
    gapX36?: boolean;
    /** row-gap: 9rem; = 144px */
    gapY36?: boolean;
    /** gap: 10rem; = 160px */
    gap40?: boolean;
    /** column-gap: 10rem; = 160px */
    gapX40?: boolean;
    /** row-gap: 10rem; = 160px */
    gapY40?: boolean;
    /** gap: 11rem; = 176px */
    gap44?: boolean;
    /** column-gap: 11rem; = 176px */
    gapX44?: boolean;
    /** row-gap: 11rem; = 176px */
    gapY44?: boolean;
    /** gap: 12rem; = 192px */
    gap48?: boolean;
    /** column-gap: 12rem; = 192px */
    gapX48?: boolean;
    /** row-gap: 12rem; = 192px */
    gapY48?: boolean;
    /** gap: 13rem; = 208px */
    gap52?: boolean;
    /** column-gap: 13rem; = 208px */
    gapX52?: boolean;
    /** row-gap: 13rem; = 208px */
    gapY52?: boolean;
    /** gap: 14rem; = 224px */
    gap56?: boolean;
    /** column-gap: 14rem; = 224px */
    gapX56?: boolean;
    /** row-gap: 14rem; = 224px */
    gapY56?: boolean;
    /** gap: 15rem; = 240px */
    gap60?: boolean;
    /** column-gap: 15rem; = 240px */
    gapX60?: boolean;
    /** row-gap: 15rem; = 240px */
    gapY60?: boolean;
    /** gap: 16rem; = 256px */
    gap64?: boolean;
    /** column-gap: 16rem; = 256px */
    gapX64?: boolean;
    /** row-gap: 16rem; = 256px */
    gapY64?: boolean;
    /** gap: 18rem; = 288px */
    gap72?: boolean;
    /** column-gap: 18rem; = 288px */
    gapX72?: boolean;
    /** row-gap: 18rem; = 288px */
    gapY72?: boolean;
    /** gap: 20rem; = 320px */
    gap80?: boolean;
    /** column-gap: 20rem; = 320px */
    gapX80?: boolean;
    /** row-gap: 20rem; = 320px */
    gapY80?: boolean;
    /** gap: 24rem; = 384px */
    gap96?: boolean;
    /** column-gap: 24rem; = 384px */
    gapX96?: boolean;
    /** row-gap: 24rem; = 384px */
    gapY96?: boolean;
    /** padding: 0px; */
    p0?: boolean;
    /** padding-left: 0px; \npadding-right: 0px; */
    px0?: boolean;
    /** padding-top: 0px; \npadding-bottom: 0px; */
    py0?: boolean;
    /** padding-inline-start: 0px; */
    ps0?: boolean;
    /** padding-inline-end: 0px; */
    pe0?: boolean;
    /** padding-top: 0px; */
    pt0?: boolean;
    /** padding-right: 0px; */
    pr0?: boolean;
    /** padding-bottom: 0px; */
    pb0?: boolean;
    /** padding-left: 0px; */
    pl0?: boolean;
    /** padding: 1px; */
    pPx?: boolean;
    /** padding-left: 1px; \npadding-right: 1px; */
    pxPx?: boolean;
    /** padding-top: 1px; \npadding-bottom: 1px; */
    pyPx?: boolean;
    /** padding-inline-start: 1px; */
    psPx?: boolean;
    /** padding-inline-end: 1px; */
    pePx?: boolean;
    /** padding-top: 1px; */
    ptPx?: boolean;
    /** padding-right: 1px; */
    prPx?: boolean;
    /** padding-bottom: 1px; */
    pbPx?: boolean;
    /** padding-left: 1px; */
    plPx?: boolean;
    /** padding: 0.125rem; = 2px */
    p0_5?: boolean;
    /** padding-left: 0.125rem; = 2px \npadding-right: 0.125rem; = 2px */
    px0_5?: boolean;
    /** padding-top: 0.125rem; = 2px \npadding-bottom: 0.125rem; = 2px */
    py0_5?: boolean;
    /** padding-inline-start: 0.125rem; = 2px */
    ps0_5?: boolean;
    /** padding-inline-end: 0.125rem; = 2px */
    pe0_5?: boolean;
    /** padding-top: 0.125rem; = 2px */
    pt0_5?: boolean;
    /** padding-right: 0.125rem; = 2px */
    pr0_5?: boolean;
    /** padding-bottom: 0.125rem; = 2px */
    pb0_5?: boolean;
    /** padding-left: 0.125rem; = 2px */
    pl0_5?: boolean;
    /** padding: 0.25rem; = 4px */
    p1?: boolean;
    /** padding: 0.25rem; = 4px */
    "-p1"?: boolean;
    /** padding-left: 0.25rem; = 4px \npadding-right: 0.25rem; = 4px */
    px1?: boolean;
    /** padding-top: 0.25rem; = 4px \npadding-bottom: 0.25rem; = 4px */
    py1?: boolean;
    /** padding-inline-start: 0.25rem; = 4px */
    ps1?: boolean;
    /** padding-inline-end: 0.25rem; = 4px */
    pe1?: boolean;
    /** padding-top: 0.25rem; = 4px */
    pt1?: boolean;
    /** padding-right: 0.25rem; = 4px */
    pr1?: boolean;
    /** padding-bottom: 0.25rem; = 4px */
    pb1?: boolean;
    /** padding-left: 0.25rem; = 4px */
    pl1?: boolean;
    /** padding: 0.375rem; = 6px */
    p1_5?: boolean;
    /** padding-left: 0.375rem; = 6px \npadding-right: 0.375rem; = 6px */
    px1_5?: boolean;
    /** padding-top: 0.375rem; = 6px \npadding-bottom: 0.375rem; = 6px */
    py1_5?: boolean;
    /** padding-inline-start: 0.375rem; = 6px */
    ps1_5?: boolean;
    /** padding-inline-end: 0.375rem; = 6px */
    pe1_5?: boolean;
    /** padding-top: 0.375rem; = 6px */
    pt1_5?: boolean;
    /** padding-right: 0.375rem; = 6px */
    pr1_5?: boolean;
    /** padding-bottom: 0.375rem; = 6px */
    pb1_5?: boolean;
    /** padding-left: 0.375rem; = 6px */
    pl1_5?: boolean;
    /** padding: 0-5rem; = 8px */
    p2?: boolean;
    /** padding-left: 0-5rem; = 8px \npadding-right: 0-5rem; = 8px */
    px2?: boolean;
    /** padding-top: 0-5rem; = 8px \npadding-bottom: 0-5rem; = 8px */
    py2?: boolean;
    /** padding-inline-start: 0-5rem; = 8px */
    ps2?: boolean;
    /** padding-inline-end: 0-5rem; = 8px */
    pe2?: boolean;
    /** padding-top: 0-5rem; = 8px */
    pt2?: boolean;
    /** padding-right: 0-5rem; = 8px */
    pr2?: boolean;
    /** padding-bottom: 0-5rem; = 8px */
    pb2?: boolean;
    /** padding-left: 0-5rem; = 8px */
    pl2?: boolean;
    /** padding: 0.625rem; = 10px */
    p2_5?: boolean;
    /** padding-left: 0.625rem; = 10px \npadding-right: 0.625rem; = 10px */
    px2_5?: boolean;
    /** padding-top: 0.625rem; = 10px \npadding-bottom: 0.625rem; = 10px */
    py2_5?: boolean;
    /** padding-inline-start: 0.625rem; = 10px */
    ps2_5?: boolean;
    /** padding-inline-end: 0.625rem; = 10px */
    pe2_5?: boolean;
    /** padding-top: 0.625rem; = 10px */
    pt2_5?: boolean;
    /** padding-right: 0.625rem; = 10px */
    pr2_5?: boolean;
    /** padding-bottom: 0.625rem; = 10px */
    pb2_5?: boolean;
    /** padding-left: 0.625rem; = 10px */
    pl2_5?: boolean;
    /** padding: 0.75rem; = 12px */
    p3?: boolean;
    /** padding-left: 0.75rem; = 12px \npadding-right: 0.75rem; = 12px */
    px3?: boolean;
    /** padding-top: 0.75rem; = 12px \npadding-bottom: 0.75rem; = 12px */
    py3?: boolean;
    /** padding-inline-start: 0.75rem; = 12px */
    ps3?: boolean;
    /** padding-inline-end: 0.75rem; = 12px */
    pe3?: boolean;
    /** padding-top: 0.75rem; = 12px */
    pt3?: boolean;
    /** padding-right: 0.75rem; = 12px */
    pr3?: boolean;
    /** padding-bottom: 0.75rem; = 12px */
    pb3?: boolean;
    /** padding-left: 0.75rem; = 12px */
    pl3?: boolean;
    /** padding: 0.875rem; = 14px */
    p3_5?: boolean;
    /** padding-left: 0.875rem; = 14px \npadding-right: 0.875rem; = 14px */
    px3_5?: boolean;
    /** padding-top: 0.875rem; = 14px \npadding-bottom: 0.875rem; = 14px */
    py3_5?: boolean;
    /** padding-inline-start: 0.875rem; = 14px */
    ps3_5?: boolean;
    /** padding-inline-end: 0.875rem; = 14px */
    pe3_5?: boolean;
    /** padding-top: 0.875rem; = 14px */
    pt3_5?: boolean;
    /** padding-right: 0.875rem; = 14px */
    pr3_5?: boolean;
    /** padding-bottom: 0.875rem; = 14px */
    pb3_5?: boolean;
    /** padding-left: 0.875rem; = 14px */
    pl3_5?: boolean;
    /** padding: 1rem; = 16px */
    p4?: boolean;
    /** padding-left: 1rem; = 16px \npadding-right: 1rem; = 16px */
    px4?: boolean;
    /** padding-top: 1rem; = 16px \npadding-bottom: 1rem; = 16px */
    py4?: boolean;
    /** padding-inline-start: 1rem; = 16px */
    ps4?: boolean;
    /** padding-inline-end: 1rem; = 16px */
    pe4?: boolean;
    /** padding-top: 1rem; = 16px */
    pt4?: boolean;
    /** padding-right: 1rem; = 16px */
    pr4?: boolean;
    /** padding-bottom: 1rem; = 16px */
    pb4?: boolean;
    /** padding-left: 1rem; = 16px */
    pl4?: boolean;
    /** padding: 1.25rem; = 20px */
    p5?: boolean;
    /** padding-left: 1.25rem; = 20px \npadding-right: 1.25rem; = 20px */
    px5?: boolean;
    /** padding-top: 1.25rem; = 20px \npadding-bottom: 1.25rem; = 20px */
    py5?: boolean;
    /** padding-inline-start: 1.25rem; = 20px */
    ps5?: boolean;
    /** padding-inline-end: 1.25rem; = 20px */
    pe5?: boolean;
    /** padding-top: 1.25rem; = 20px */
    pt5?: boolean;
    /** padding-right: 1.25rem; = 20px */
    pr5?: boolean;
    /** padding-bottom: 1.25rem; = 20px */
    pb5?: boolean;
    /** padding-left: 1.25rem; = 20px */
    pl5?: boolean;
    /** padding: 1-5rem; = 24px */
    p6?: boolean;
    /** padding-left: 1-5rem; = 24px \npadding-right: 1-5rem; = 24px */
    px6?: boolean;
    /** padding-top: 1-5rem; = 24px \npadding-bottom: 1-5rem; = 24px */
    py6?: boolean;
    /** padding-inline-start: 1-5rem; = 24px */
    ps6?: boolean;
    /** padding-inline-end: 1-5rem; = 24px */
    pe6?: boolean;
    /** padding-top: 1-5rem; = 24px */
    pt6?: boolean;
    /** padding-right: 1-5rem; = 24px */
    pr6?: boolean;
    /** padding-bottom: 1-5rem; = 24px */
    pb6?: boolean;
    /** padding-left: 1-5rem; = 24px */
    pl6?: boolean;
    /** padding: 1.75rem; = 28px */
    p7?: boolean;
    /** padding-left: 1.75rem; = 28px \npadding-right: 1.75rem; = 28px */
    px7?: boolean;
    /** padding-top: 1.75rem; = 28px \npadding-bottom: 1.75rem; = 28px */
    py7?: boolean;
    /** padding-inline-start: 1.75rem; = 28px */
    ps7?: boolean;
    /** padding-inline-end: 1.75rem; = 28px */
    pe7?: boolean;
    /** padding-top: 1.75rem; = 28px */
    pt7?: boolean;
    /** padding-right: 1.75rem; = 28px */
    pr7?: boolean;
    /** padding-bottom: 1.75rem; = 28px */
    pb7?: boolean;
    /** padding-left: 1.75rem; = 28px */
    pl7?: boolean;
    /** padding: 2rem; = 32px */
    p8?: boolean;
    /** padding-left: 2rem; = 32px \npadding-right: 2rem; = 32px */
    px8?: boolean;
    /** padding-top: 2rem; = 32px \npadding-bottom: 2rem; = 32px */
    py8?: boolean;
    /** padding-inline-start: 2rem; = 32px */
    ps8?: boolean;
    /** padding-inline-end: 2rem; = 32px */
    pe8?: boolean;
    /** padding-top: 2rem; = 32px */
    pt8?: boolean;
    /** padding-right: 2rem; = 32px */
    pr8?: boolean;
    /** padding-bottom: 2rem; = 32px */
    pb8?: boolean;
    /** padding-left: 2rem; = 32px */
    pl8?: boolean;
    /** padding: 2.25rem; = 36px */
    p9?: boolean;
    /** padding-left: 2.25rem; = 36px \npadding-right: 2.25rem; = 36px */
    px9?: boolean;
    /** padding-top: 2.25rem; = 36px \npadding-bottom: 2.25rem; = 36px */
    py9?: boolean;
    /** padding-inline-start: 2.25rem; = 36px */
    ps9?: boolean;
    /** padding-inline-end: 2.25rem; = 36px */
    pe9?: boolean;
    /** padding-top: 2.25rem; = 36px */
    pt9?: boolean;
    /** padding-right: 2.25rem; = 36px */
    pr9?: boolean;
    /** padding-bottom: 2.25rem; = 36px */
    pb9?: boolean;
    /** padding-left: 2.25rem; = 36px */
    pl9?: boolean;
    /** padding: 2-5rem; = 40px */
    p10?: boolean;
    /** padding-left: 2-5rem; = 40px \npadding-right: 2-5rem; = 40px */
    px10?: boolean;
    /** padding-top: 2-5rem; = 40px \npadding-bottom: 2-5rem; = 40px */
    py10?: boolean;
    /** padding-inline-start: 2-5rem; = 40px */
    ps10?: boolean;
    /** padding-inline-end: 2-5rem; = 40px */
    pe10?: boolean;
    /** padding-top: 2-5rem; = 40px */
    pt10?: boolean;
    /** padding-right: 2-5rem; = 40px */
    pr10?: boolean;
    /** padding-bottom: 2-5rem; = 40px */
    pb10?: boolean;
    /** padding-left: 2-5rem; = 40px */
    pl10?: boolean;
    /** padding: 2.75rem; = 44px */
    p11?: boolean;
    /** padding-left: 2.75rem; = 44px \npadding-right: 2.75rem; = 44px */
    px11?: boolean;
    /** padding-top: 2.75rem; = 44px \npadding-bottom: 2.75rem; = 44px */
    py11?: boolean;
    /** padding-inline-start: 2.75rem; = 44px */
    ps11?: boolean;
    /** padding-inline-end: 2.75rem; = 44px */
    pe11?: boolean;
    /** padding-top: 2.75rem; = 44px */
    pt11?: boolean;
    /** padding-right: 2.75rem; = 44px */
    pr11?: boolean;
    /** padding-bottom: 2.75rem; = 44px */
    pb11?: boolean;
    /** padding-left: 2.75rem; = 44px */
    pl11?: boolean;
    /** padding: 3rem; = 48px */
    p12?: boolean;
    /** padding-left: 3rem; = 48px \npadding-right: 3rem; = 48px */
    px12?: boolean;
    /** padding-top: 3rem; = 48px \npadding-bottom: 3rem; = 48px */
    py12?: boolean;
    /** padding-inline-start: 3rem; = 48px */
    ps12?: boolean;
    /** padding-inline-end: 3rem; = 48px */
    pe12?: boolean;
    /** padding-top: 3rem; = 48px */
    pt12?: boolean;
    /** padding-right: 3rem; = 48px */
    pr12?: boolean;
    /** padding-bottom: 3rem; = 48px */
    pb12?: boolean;
    /** padding-left: 3rem; = 48px */
    pl12?: boolean;
    /** padding: 3-5rem; = 56px */
    p14?: boolean;
    /** padding-left: 3-5rem; = 56px \npadding-right: 3-5rem; = 56px */
    px14?: boolean;
    /** padding-top: 3-5rem; = 56px \npadding-bottom: 3-5rem; = 56px */
    py14?: boolean;
    /** padding-inline-start: 3-5rem; = 56px */
    ps14?: boolean;
    /** padding-inline-end: 3-5rem; = 56px */
    pe14?: boolean;
    /** padding-top: 3-5rem; = 56px */
    pt14?: boolean;
    /** padding-right: 3-5rem; = 56px */
    pr14?: boolean;
    /** padding-bottom: 3-5rem; = 56px */
    pb14?: boolean;
    /** padding-left: 3-5rem; = 56px */
    pl14?: boolean;
    /** padding: 4rem; = 64px */
    p16?: boolean;
    /** padding-left: 4rem; = 64px \npadding-right: 4rem; = 64px */
    px16?: boolean;
    /** padding-top: 4rem; = 64px \npadding-bottom: 4rem; = 64px */
    py16?: boolean;
    /** padding-inline-start: 4rem; = 64px */
    ps16?: boolean;
    /** padding-inline-end: 4rem; = 64px */
    pe16?: boolean;
    /** padding-top: 4rem; = 64px */
    pt16?: boolean;
    /** padding-right: 4rem; = 64px */
    pr16?: boolean;
    /** padding-bottom: 4rem; = 64px */
    pb16?: boolean;
    /** padding-left: 4rem; = 64px */
    pl16?: boolean;
    /** padding: 5rem; = 80px */
    p20?: boolean;
    /** padding-left: 5rem; = 80px \npadding-right: 5rem; = 80px */
    px20?: boolean;
    /** padding-top: 5rem; = 80px \npadding-bottom: 5rem; = 80px */
    py20?: boolean;
    /** padding-inline-start: 5rem; = 80px */
    ps20?: boolean;
    /** padding-inline-end: 5rem; = 80px */
    pe20?: boolean;
    /** padding-top: 5rem; = 80px */
    pt20?: boolean;
    /** padding-right: 5rem; = 80px */
    pr20?: boolean;
    /** padding-bottom: 5rem; = 80px */
    pb20?: boolean;
    /** padding-left: 5rem; = 80px */
    pl20?: boolean;
    /** padding: 6rem; = 96px */
    p24?: boolean;
    /** padding-left: 6rem; = 96px \npadding-right: 6rem; = 96px */
    px24?: boolean;
    /** padding-top: 6rem; = 96px \npadding-bottom: 6rem; = 96px */
    py24?: boolean;
    /** padding-inline-start: 6rem; = 96px */
    ps24?: boolean;
    /** padding-inline-end: 6rem; = 96px */
    pe24?: boolean;
    /** padding-top: 6rem; = 96px */
    pt24?: boolean;
    /** padding-right: 6rem; = 96px */
    pr24?: boolean;
    /** padding-bottom: 6rem; = 96px */
    pb24?: boolean;
    /** padding-left: 6rem; = 96px */
    pl24?: boolean;
    /** padding: 7rem; = 112px */
    p28?: boolean;
    /** padding-left: 7rem; = 112px \npadding-right: 7rem; = 112px */
    px28?: boolean;
    /** padding-top: 7rem; = 112px \npadding-bottom: 7rem; = 112px */
    py28?: boolean;
    /** padding-inline-start: 7rem; = 112px */
    ps28?: boolean;
    /** padding-inline-end: 7rem; = 112px */
    pe28?: boolean;
    /** padding-top: 7rem; = 112px */
    pt28?: boolean;
    /** padding-right: 7rem; = 112px */
    pr28?: boolean;
    /** padding-bottom: 7rem; = 112px */
    pb28?: boolean;
    /** padding-left: 7rem; = 112px */
    pl28?: boolean;
    /** padding: 8rem; = 128px */
    p32?: boolean;
    /** padding-left: 8rem; = 128px \npadding-right: 8rem; = 128px */
    px32?: boolean;
    /** padding-top: 8rem; = 128px \npadding-bottom: 8rem; = 128px */
    py32?: boolean;
    /** padding-inline-start: 8rem; = 128px */
    ps32?: boolean;
    /** padding-inline-end: 8rem; = 128px */
    pe32?: boolean;
    /** padding-top: 8rem; = 128px */
    pt32?: boolean;
    /** padding-right: 8rem; = 128px */
    pr32?: boolean;
    /** padding-bottom: 8rem; = 128px */
    pb32?: boolean;
    /** padding-left: 8rem; = 128px */
    pl32?: boolean;
    /** padding: 9rem; = 144px */
    p36?: boolean;
    /** padding-left: 9rem; = 144px \npadding-right: 9rem; = 144px */
    px36?: boolean;
    /** padding-top: 9rem; = 144px \npadding-bottom: 9rem; = 144px */
    py36?: boolean;
    /** padding-inline-start: 9rem; = 144px */
    ps36?: boolean;
    /** padding-inline-end: 9rem; = 144px */
    pe36?: boolean;
    /** padding-top: 9rem; = 144px */
    pt36?: boolean;
    /** padding-right: 9rem; = 144px */
    pr36?: boolean;
    /** padding-bottom: 9rem; = 144px */
    pb36?: boolean;
    /** padding-left: 9rem; = 144px */
    pl36?: boolean;
    /** padding: 10rem; = 160px */
    p40?: boolean;
    /** padding-left: 10rem; = 160px \npadding-right: 10rem; = 160px */
    px40?: boolean;
    /** padding-top: 10rem; = 160px \npadding-bottom: 10rem; = 160px */
    py40?: boolean;
    /** padding-inline-start: 10rem; = 160px */
    ps40?: boolean;
    /** padding-inline-end: 10rem; = 160px */
    pe40?: boolean;
    /** padding-top: 10rem; = 160px */
    pt40?: boolean;
    /** padding-right: 10rem; = 160px */
    pr40?: boolean;
    /** padding-bottom: 10rem; = 160px */
    pb40?: boolean;
    /** padding-left: 10rem; = 160px */
    pl40?: boolean;
    /** padding: 11rem; = 176px */
    p44?: boolean;
    /** padding-left: 11rem; = 176px \npadding-right: 11rem; = 176px */
    px44?: boolean;
    /** padding-top: 11rem; = 176px \npadding-bottom: 11rem; = 176px */
    py44?: boolean;
    /** padding-inline-start: 11rem; = 176px */
    ps44?: boolean;
    /** padding-inline-end: 11rem; = 176px */
    pe44?: boolean;
    /** padding-top: 11rem; = 176px */
    pt44?: boolean;
    /** padding-right: 11rem; = 176px */
    pr44?: boolean;
    /** padding-bottom: 11rem; = 176px */
    pb44?: boolean;
    /** padding-left: 11rem; = 176px */
    pl44?: boolean;
    /** padding: 12rem; = 192px */
    p48?: boolean;
    /** padding-left: 12rem; = 192px \npadding-right: 12rem; = 192px */
    px48?: boolean;
    /** padding-top: 12rem; = 192px \npadding-bottom: 12rem; = 192px */
    py48?: boolean;
    /** padding-inline-start: 12rem; = 192px */
    ps48?: boolean;
    /** padding-inline-end: 12rem; = 192px */
    pe48?: boolean;
    /** padding-top: 12rem; = 192px */
    pt48?: boolean;
    /** padding-right: 12rem; = 192px */
    pr48?: boolean;
    /** padding-bottom: 12rem; = 192px */
    pb48?: boolean;
    /** padding-left: 12rem; = 192px */
    pl48?: boolean;
    /** padding: 13rem; = 208px */
    p52?: boolean;
    /** padding-left: 13rem; = 208px \npadding-right: 13rem; = 208px */
    px52?: boolean;
    /** padding-top: 13rem; = 208px \npadding-bottom: 13rem; = 208px */
    py52?: boolean;
    /** padding-inline-start: 13rem; = 208px */
    ps52?: boolean;
    /** padding-inline-end: 13rem; = 208px */
    pe52?: boolean;
    /** padding-top: 13rem; = 208px */
    pt52?: boolean;
    /** padding-right: 13rem; = 208px */
    pr52?: boolean;
    /** padding-bottom: 13rem; = 208px */
    pb52?: boolean;
    /** padding-left: 13rem; = 208px */
    pl52?: boolean;
    /** padding: 14rem; = 224px */
    p56?: boolean;
    /** padding-left: 14rem; = 224px \npadding-right: 14rem; = 224px */
    px56?: boolean;
    /** padding-top: 14rem; = 224px \npadding-bottom: 14rem; = 224px */
    py56?: boolean;
    /** padding-inline-start: 14rem; = 224px */
    ps56?: boolean;
    /** padding-inline-end: 14rem; = 224px */
    pe56?: boolean;
    /** padding-top: 14rem; = 224px */
    pt56?: boolean;
    /** padding-right: 14rem; = 224px */
    pr56?: boolean;
    /** padding-bottom: 14rem; = 224px */
    pb56?: boolean;
    /** padding-left: 14rem; = 224px */
    pl56?: boolean;
    /** padding: 15rem; = 240px */
    p60?: boolean;
    /** padding-left: 15rem; = 240px \npadding-right: 15rem; = 240px */
    px60?: boolean;
    /** padding-top: 15rem; = 240px \npadding-bottom: 15rem; = 240px */
    py60?: boolean;
    /** padding-inline-start: 15rem; = 240px */
    ps60?: boolean;
    /** padding-inline-end: 15rem; = 240px */
    pe60?: boolean;
    /** padding-top: 15rem; = 240px */
    pt60?: boolean;
    /** padding-right: 15rem; = 240px */
    pr60?: boolean;
    /** padding-bottom: 15rem; = 240px */
    pb60?: boolean;
    /** padding-left: 15rem; = 240px */
    pl60?: boolean;
    /** padding: 16rem; = 256px */
    p64?: boolean;
    /** padding-left: 16rem; = 256px \npadding-right: 16rem; = 256px */
    px64?: boolean;
    /** padding-top: 16rem; = 256px \npadding-bottom: 16rem; = 256px */
    py64?: boolean;
    /** padding-inline-start: 16rem; = 256px */
    ps64?: boolean;
    /** padding-inline-end: 16rem; = 256px */
    pe64?: boolean;
    /** padding-top: 16rem; = 256px */
    pt64?: boolean;
    /** padding-right: 16rem; = 256px */
    pr64?: boolean;
    /** padding-bottom: 16rem; = 256px */
    pb64?: boolean;
    /** padding-left: 16rem; = 256px */
    pl64?: boolean;
    /** padding: 18rem; = 288px */
    p72?: boolean;
    /** padding-left: 18rem; = 288px \npadding-right: 18rem; = 288px */
    px72?: boolean;
    /** padding-top: 18rem; = 288px \npadding-bottom: 18rem; = 288px */
    py72?: boolean;
    /** padding-inline-start: 18rem; = 288px */
    ps72?: boolean;
    /** padding-inline-end: 18rem; = 288px */
    pe72?: boolean;
    /** padding-top: 18rem; = 288px */
    pt72?: boolean;
    /** padding-right: 18rem; = 288px */
    pr72?: boolean;
    /** padding-bottom: 18rem; = 288px */
    pb72?: boolean;
    /** padding-left: 18rem; = 288px */
    pl72?: boolean;
    /** padding: 20rem; = 320px */
    p80?: boolean;
    /** padding-left: 20rem; = 320px \npadding-right: 20rem; = 320px */
    px80?: boolean;
    /** padding-top: 20rem; = 320px \npadding-bottom: 20rem; = 320px */
    py80?: boolean;
    /** padding-inline-start: 20rem; = 320px */
    ps80?: boolean;
    /** padding-inline-end: 20rem; = 320px */
    pe80?: boolean;
    /** padding-top: 20rem; = 320px */
    pt80?: boolean;
    /** padding-right: 20rem; = 320px */
    pr80?: boolean;
    /** padding-bottom: 20rem; = 320px */
    pb80?: boolean;
    /** padding-left: 20rem; = 320px */
    pl80?: boolean;
    /** padding: 24rem; = 384px */
    p96?: boolean;
    /** padding-left: 24rem; = 384px \npadding-right: 24rem; = 384px */
    px96?: boolean;
    /** padding-top: 24rem; = 384px \npadding-bottom: 24rem; = 384px */
    py96?: boolean;
    /** padding-inline-start: 24rem; = 384px */
    ps96?: boolean;
    /** padding-inline-end: 24rem; = 384px */
    pe96?: boolean;
    /** padding-top: 24rem; = 384px */
    pt96?: boolean;
    /** padding-right: 24rem; = 384px */
    pr96?: boolean;
    /** padding-bottom: 24rem; = 384px */
    pb96?: boolean;
    /** padding-left: 24rem; = 384px */
    pl96?: boolean;
    /** margin: 0px; */
    m0?: boolean;
    /** margin-left: 0px; \nmargin-right: 0px; */
    mx0?: boolean;
    /** margin-top: 0px; \nmargin-bottom: 0px; */
    my0?: boolean;
    /** margin-inline-start: 0px; */
    ms0?: boolean;
    /** margin-inline-end: 0px; */
    me0?: boolean;
    /** margin-top: 0px; */
    mt0?: boolean;
    /** margin-right: 0px; */
    mr0?: boolean;
    /** margin-bottom: 0px; */
    mb0?: boolean;
    /** margin-left: 0px; */
    ml0?: boolean;
    /** margin: 1px; */
    mPx?: boolean;
    /** margin-left: 1px; \nmargin-right: 1px; */
    mxPx?: boolean;
    /** margin-top: 1px; \nmargin-bottom: 1px; */
    myPx?: boolean;
    /** margin-inline-start: 1px; */
    msPx?: boolean;
    /** margin-inline-end: 1px; */
    mePx?: boolean;
    /** margin-top: 1px; */
    mtPx?: boolean;
    /** margin-right: 1px; */
    mrPx?: boolean;
    /** margin-bottom: 1px; */
    mbPx?: boolean;
    /** margin-left: 1px; */
    mlPx?: boolean;
    /** margin: 0.125rem; = 2px */
    m0_5?: boolean;
    /** margin-left: 0.125rem; = 2px \nmargin-right: 0.125rem; = 2px */
    mx0_5?: boolean;
    /** margin-top: 0.125rem; = 2px \nmargin-bottom: 0.125rem; = 2px */
    my0_5?: boolean;
    /** margin-inline-start: 0.125rem; = 2px */
    ms0_5?: boolean;
    /** margin-inline-end: 0.125rem; = 2px */
    me0_5?: boolean;
    /** margin-top: 0.125rem; = 2px */
    mt0_5?: boolean;
    /** margin-right: 0.125rem; = 2px */
    mr0_5?: boolean;
    /** margin-bottom: 0.125rem; = 2px */
    mb0_5?: boolean;
    /** margin-left: 0.125rem; = 2px */
    ml0_5?: boolean;
    /** margin: 0.25rem; = 4px */
    m1?: boolean;
    /** margin-left: 0.25rem; = 4px \nmargin-right: 0.25rem; = 4px */
    mx1?: boolean;
    /** margin-top: 0.25rem; = 4px \nmargin-bottom: 0.25rem; = 4px */
    my1?: boolean;
    /** margin-inline-start: 0.25rem; = 4px */
    ms1?: boolean;
    /** margin-inline-end: 0.25rem; = 4px */
    me1?: boolean;
    /** margin-top: 0.25rem; = 4px */
    mt1?: boolean;
    /** margin-right: 0.25rem; = 4px */
    mr1?: boolean;
    /** margin-bottom: 0.25rem; = 4px */
    mb1?: boolean;
    /** margin-left: 0.25rem; = 4px */
    ml1?: boolean;
    /** margin: 0.375rem; = 6px */
    m1_5?: boolean;
    /** margin-left: 0.375rem; = 6px \nmargin-right: 0.375rem; = 6px */
    mx1_5?: boolean;
    /** margin-top: 0.375rem; = 6px \nmargin-bottom: 0.375rem; = 6px */
    my1_5?: boolean;
    /** margin-inline-start: 0.375rem; = 6px */
    ms1_5?: boolean;
    /** margin-inline-end: 0.375rem; = 6px */
    me1_5?: boolean;
    /** margin-top: 0.375rem; = 6px */
    mt1_5?: boolean;
    /** margin-right: 0.375rem; = 6px */
    mr1_5?: boolean;
    /** margin-bottom: 0.375rem; = 6px */
    mb1_5?: boolean;
    /** margin-left: 0.375rem; = 6px */
    ml1_5?: boolean;
    /** margin: 0-5rem; = 8px */
    m2?: boolean;
    /** margin-left: 0-5rem; = 8px \nmargin-right: 0-5rem; = 8px */
    mx2?: boolean;
    /** margin-top: 0-5rem; = 8px \nmargin-bottom: 0-5rem; = 8px */
    my2?: boolean;
    /** margin-inline-start: 0-5rem; = 8px */
    ms2?: boolean;
    /** margin-inline-end: 0-5rem; = 8px */
    me2?: boolean;
    /** margin-top: 0-5rem; = 8px */
    mt2?: boolean;
    /** margin-right: 0-5rem; = 8px */
    mr2?: boolean;
    /** margin-bottom: 0-5rem; = 8px */
    mb2?: boolean;
    /** margin-left: 0-5rem; = 8px */
    ml2?: boolean;
    /** margin: 0.625rem; = 10px */
    m2_5?: boolean;
    /** margin-left: 0.625rem; = 10px \nmargin-right: 0.625rem; = 10px */
    mx2_5?: boolean;
    /** margin-top: 0.625rem; = 10px \nmargin-bottom: 0.625rem; = 10px */
    my2_5?: boolean;
    /** margin-inline-start: 0.625rem; = 10px */
    ms2_5?: boolean;
    /** margin-inline-end: 0.625rem; = 10px */
    me2_5?: boolean;
    /** margin-top: 0.625rem; = 10px */
    mt2_5?: boolean;
    /** margin-right: 0.625rem; = 10px */
    mr2_5?: boolean;
    /** margin-bottom: 0.625rem; = 10px */
    mb2_5?: boolean;
    /** margin-left: 0.625rem; = 10px */
    ml2_5?: boolean;
    /** margin: 0.75rem; = 12px */
    m3?: boolean;
    /** margin-left: 0.75rem; = 12px \nmargin-right: 0.75rem; = 12px */
    mx3?: boolean;
    /** margin-top: 0.75rem; = 12px \nmargin-bottom: 0.75rem; = 12px */
    my3?: boolean;
    /** margin-inline-start: 0.75rem; = 12px */
    ms3?: boolean;
    /** margin-inline-end: 0.75rem; = 12px */
    me3?: boolean;
    /** margin-top: 0.75rem; = 12px */
    mt3?: boolean;
    /** margin-right: 0.75rem; = 12px */
    mr3?: boolean;
    /** margin-bottom: 0.75rem; = 12px */
    mb3?: boolean;
    /** margin-left: 0.75rem; = 12px */
    ml3?: boolean;
    /** margin: 0.875rem; = 14px */
    m3_5?: boolean;
    /** margin-left: 0.875rem; = 14px \nmargin-right: 0.875rem; = 14px */
    mx3_5?: boolean;
    /** margin-top: 0.875rem; = 14px \nmargin-bottom: 0.875rem; = 14px */
    my3_5?: boolean;
    /** margin-inline-start: 0.875rem; = 14px */
    ms3_5?: boolean;
    /** margin-inline-end: 0.875rem; = 14px */
    me3_5?: boolean;
    /** margin-top: 0.875rem; = 14px */
    mt3_5?: boolean;
    /** margin-right: 0.875rem; = 14px */
    mr3_5?: boolean;
    /** margin-bottom: 0.875rem; = 14px */
    mb3_5?: boolean;
    /** margin-left: 0.875rem; = 14px */
    ml3_5?: boolean;
    /** margin: 1rem; = 16px */
    m4?: boolean;
    /** margin-left: 1rem; = 16px \nmargin-right: 1rem; = 16px */
    mx4?: boolean;
    /** margin-top: 1rem; = 16px \nmargin-bottom: 1rem; = 16px */
    my4?: boolean;
    /** margin-inline-start: 1rem; = 16px */
    ms4?: boolean;
    /** margin-inline-end: 1rem; = 16px */
    me4?: boolean;
    /** margin-top: 1rem; = 16px */
    mt4?: boolean;
    /** margin-right: 1rem; = 16px */
    mr4?: boolean;
    /** margin-bottom: 1rem; = 16px */
    mb4?: boolean;
    /** margin-left: 1rem; = 16px */
    ml4?: boolean;
    /** margin: 1.25rem; = 20px */
    m5?: boolean;
    /** margin-left: 1.25rem; = 20px \nmargin-right: 1.25rem; = 20px */
    mx5?: boolean;
    /** margin-top: 1.25rem; = 20px \nmargin-bottom: 1.25rem; = 20px */
    my5?: boolean;
    /** margin-inline-start: 1.25rem; = 20px */
    ms5?: boolean;
    /** margin-inline-end: 1.25rem; = 20px */
    me5?: boolean;
    /** margin-top: 1.25rem; = 20px */
    mt5?: boolean;
    /** margin-right: 1.25rem; = 20px */
    mr5?: boolean;
    /** margin-bottom: 1.25rem; = 20px */
    mb5?: boolean;
    /** margin-left: 1.25rem; = 20px */
    ml5?: boolean;
    /** margin: 1-5rem; = 24px */
    m6?: boolean;
    /** margin-left: 1-5rem; = 24px \nmargin-right: 1-5rem; = 24px */
    mx6?: boolean;
    /** margin-top: 1-5rem; = 24px \nmargin-bottom: 1-5rem; = 24px */
    my6?: boolean;
    /** margin-inline-start: 1-5rem; = 24px */
    ms6?: boolean;
    /** margin-inline-end: 1-5rem; = 24px */
    me6?: boolean;
    /** margin-top: 1-5rem; = 24px */
    mt6?: boolean;
    /** margin-right: 1-5rem; = 24px */
    mr6?: boolean;
    /** margin-bottom: 1-5rem; = 24px */
    mb6?: boolean;
    /** margin-left: 1-5rem; = 24px */
    ml6?: boolean;
    /** margin: 1.75rem; = 28px */
    m7?: boolean;
    /** margin-left: 1.75rem; = 28px \nmargin-right: 1.75rem; = 28px */
    mx7?: boolean;
    /** margin-top: 1.75rem; = 28px \nmargin-bottom: 1.75rem; = 28px */
    my7?: boolean;
    /** margin-inline-start: 1.75rem; = 28px */
    ms7?: boolean;
    /** margin-inline-end: 1.75rem; = 28px */
    me7?: boolean;
    /** margin-top: 1.75rem; = 28px */
    mt7?: boolean;
    /** margin-right: 1.75rem; = 28px */
    mr7?: boolean;
    /** margin-bottom: 1.75rem; = 28px */
    mb7?: boolean;
    /** margin-left: 1.75rem; = 28px */
    ml7?: boolean;
    /** margin: 2rem; = 32px */
    m8?: boolean;
    /** margin-left: 2rem; = 32px \nmargin-right: 2rem; = 32px */
    mx8?: boolean;
    /** margin-top: 2rem; = 32px \nmargin-bottom: 2rem; = 32px */
    my8?: boolean;
    /** margin-inline-start: 2rem; = 32px */
    ms8?: boolean;
    /** margin-inline-end: 2rem; = 32px */
    me8?: boolean;
    /** margin-top: 2rem; = 32px */
    mt8?: boolean;
    /** margin-right: 2rem; = 32px */
    mr8?: boolean;
    /** margin-bottom: 2rem; = 32px */
    mb8?: boolean;
    /** margin-left: 2rem; = 32px */
    ml8?: boolean;
    /** margin: 2.25rem; = 36px */
    m9?: boolean;
    /** margin-left: 2.25rem; = 36px \nmargin-right: 2.25rem; = 36px */
    mx9?: boolean;
    /** margin-top: 2.25rem; = 36px \nmargin-bottom: 2.25rem; = 36px */
    my9?: boolean;
    /** margin-inline-start: 2.25rem; = 36px */
    ms9?: boolean;
    /** margin-inline-end: 2.25rem; = 36px */
    me9?: boolean;
    /** margin-top: 2.25rem; = 36px */
    mt9?: boolean;
    /** margin-right: 2.25rem; = 36px */
    mr9?: boolean;
    /** margin-bottom: 2.25rem; = 36px */
    mb9?: boolean;
    /** margin-left: 2.25rem; = 36px */
    ml9?: boolean;
    /** margin: 2-5rem; = 40px */
    m10?: boolean;
    /** margin-left: 2-5rem; = 40px \nmargin-right: 2-5rem; = 40px */
    mx10?: boolean;
    /** margin-top: 2-5rem; = 40px \nmargin-bottom: 2-5rem; = 40px */
    my10?: boolean;
    /** margin-inline-start: 2-5rem; = 40px */
    ms10?: boolean;
    /** margin-inline-end: 2-5rem; = 40px */
    me10?: boolean;
    /** margin-top: 2-5rem; = 40px */
    mt10?: boolean;
    /** margin-right: 2-5rem; = 40px */
    mr10?: boolean;
    /** margin-bottom: 2-5rem; = 40px */
    mb10?: boolean;
    /** margin-left: 2-5rem; = 40px */
    ml10?: boolean;
    /** margin: 2.75rem; = 44px */
    m11?: boolean;
    /** margin-left: 2.75rem; = 44px \nmargin-right: 2.75rem; = 44px */
    mx11?: boolean;
    /** margin-top: 2.75rem; = 44px \nmargin-bottom: 2.75rem; = 44px */
    my11?: boolean;
    /** margin-inline-start: 2.75rem; = 44px */
    ms11?: boolean;
    /** margin-inline-end: 2.75rem; = 44px */
    me11?: boolean;
    /** margin-top: 2.75rem; = 44px */
    mt11?: boolean;
    /** margin-right: 2.75rem; = 44px */
    mr11?: boolean;
    /** margin-bottom: 2.75rem; = 44px */
    mb11?: boolean;
    /** margin-left: 2.75rem; = 44px */
    ml11?: boolean;
    /** margin: 3rem; = 48px */
    m12?: boolean;
    /** margin-left: 3rem; = 48px \nmargin-right: 3rem; = 48px */
    mx12?: boolean;
    /** margin-top: 3rem; = 48px \nmargin-bottom: 3rem; = 48px */
    my12?: boolean;
    /** margin-inline-start: 3rem; = 48px */
    ms12?: boolean;
    /** margin-inline-end: 3rem; = 48px */
    me12?: boolean;
    /** margin-top: 3rem; = 48px */
    mt12?: boolean;
    /** margin-right: 3rem; = 48px */
    mr12?: boolean;
    /** margin-bottom: 3rem; = 48px */
    mb12?: boolean;
    /** margin-left: 3rem; = 48px */
    ml12?: boolean;
    /** margin: 3-5rem; = 56px */
    m14?: boolean;
    /** margin-left: 3-5rem; = 56px \nmargin-right: 3-5rem; = 56px */
    mx14?: boolean;
    /** margin-top: 3-5rem; = 56px \nmargin-bottom: 3-5rem; = 56px */
    my14?: boolean;
    /** margin-inline-start: 3-5rem; = 56px */
    ms14?: boolean;
    /** margin-inline-end: 3-5rem; = 56px */
    me14?: boolean;
    /** margin-top: 3-5rem; = 56px */
    mt14?: boolean;
    /** margin-right: 3-5rem; = 56px */
    mr14?: boolean;
    /** margin-bottom: 3-5rem; = 56px */
    mb14?: boolean;
    /** margin-left: 3-5rem; = 56px */
    ml14?: boolean;
    /** margin: 4rem; = 64px */
    m16?: boolean;
    /** margin-left: 4rem; = 64px \nmargin-right: 4rem; = 64px */
    mx16?: boolean;
    /** margin-top: 4rem; = 64px \nmargin-bottom: 4rem; = 64px */
    my16?: boolean;
    /** margin-inline-start: 4rem; = 64px */
    ms16?: boolean;
    /** margin-inline-end: 4rem; = 64px */
    me16?: boolean;
    /** margin-top: 4rem; = 64px */
    mt16?: boolean;
    /** margin-right: 4rem; = 64px */
    mr16?: boolean;
    /** margin-bottom: 4rem; = 64px */
    mb16?: boolean;
    /** margin-left: 4rem; = 64px */
    ml16?: boolean;
    /** margin: 5rem; = 80px */
    m20?: boolean;
    /** margin-left: 5rem; = 80px \nmargin-right: 5rem; = 80px */
    mx20?: boolean;
    /** margin-top: 5rem; = 80px \nmargin-bottom: 5rem; = 80px */
    my20?: boolean;
    /** margin-inline-start: 5rem; = 80px */
    ms20?: boolean;
    /** margin-inline-end: 5rem; = 80px */
    me20?: boolean;
    /** margin-top: 5rem; = 80px */
    mt20?: boolean;
    /** margin-right: 5rem; = 80px */
    mr20?: boolean;
    /** margin-bottom: 5rem; = 80px */
    mb20?: boolean;
    /** margin-left: 5rem; = 80px */
    ml20?: boolean;
    /** margin: 6rem; = 96px */
    m24?: boolean;
    /** margin-left: 6rem; = 96px \nmargin-right: 6rem; = 96px */
    mx24?: boolean;
    /** margin-top: 6rem; = 96px \nmargin-bottom: 6rem; = 96px */
    my24?: boolean;
    /** margin-inline-start: 6rem; = 96px */
    ms24?: boolean;
    /** margin-inline-end: 6rem; = 96px */
    me24?: boolean;
    /** margin-top: 6rem; = 96px */
    mt24?: boolean;
    /** margin-right: 6rem; = 96px */
    mr24?: boolean;
    /** margin-bottom: 6rem; = 96px */
    mb24?: boolean;
    /** margin-left: 6rem; = 96px */
    ml24?: boolean;
    /** margin: 7rem; = 112px */
    m28?: boolean;
    /** margin-left: 7rem; = 112px \nmargin-right: 7rem; = 112px */
    mx28?: boolean;
    /** margin-top: 7rem; = 112px \nmargin-bottom: 7rem; = 112px */
    my28?: boolean;
    /** margin-inline-start: 7rem; = 112px */
    ms28?: boolean;
    /** margin-inline-end: 7rem; = 112px */
    me28?: boolean;
    /** margin-top: 7rem; = 112px */
    mt28?: boolean;
    /** margin-right: 7rem; = 112px */
    mr28?: boolean;
    /** margin-bottom: 7rem; = 112px */
    mb28?: boolean;
    /** margin-left: 7rem; = 112px */
    ml28?: boolean;
    /** margin: 8rem; = 128px */
    m32?: boolean;
    /** margin-left: 8rem; = 128px \nmargin-right: 8rem; = 128px */
    mx32?: boolean;
    /** margin-top: 8rem; = 128px \nmargin-bottom: 8rem; = 128px */
    my32?: boolean;
    /** margin-inline-start: 8rem; = 128px */
    ms32?: boolean;
    /** margin-inline-end: 8rem; = 128px */
    me32?: boolean;
    /** margin-top: 8rem; = 128px */
    mt32?: boolean;
    /** margin-right: 8rem; = 128px */
    mr32?: boolean;
    /** margin-bottom: 8rem; = 128px */
    mb32?: boolean;
    /** margin-left: 8rem; = 128px */
    ml32?: boolean;
    /** margin: 9rem; = 144px */
    m36?: boolean;
    /** margin-left: 9rem; = 144px \nmargin-right: 9rem; = 144px */
    mx36?: boolean;
    /** margin-top: 9rem; = 144px \nmargin-bottom: 9rem; = 144px */
    my36?: boolean;
    /** margin-inline-start: 9rem; = 144px */
    ms36?: boolean;
    /** margin-inline-end: 9rem; = 144px */
    me36?: boolean;
    /** margin-top: 9rem; = 144px */
    mt36?: boolean;
    /** margin-right: 9rem; = 144px */
    mr36?: boolean;
    /** margin-bottom: 9rem; = 144px */
    mb36?: boolean;
    /** margin-left: 9rem; = 144px */
    ml36?: boolean;
    /** margin: 10rem; = 160px */
    m40?: boolean;
    /** margin-left: 10rem; = 160px \nmargin-right: 10rem; = 160px */
    mx40?: boolean;
    /** margin-top: 10rem; = 160px \nmargin-bottom: 10rem; = 160px */
    my40?: boolean;
    /** margin-inline-start: 10rem; = 160px */
    ms40?: boolean;
    /** margin-inline-end: 10rem; = 160px */
    me40?: boolean;
    /** margin-top: 10rem; = 160px */
    mt40?: boolean;
    /** margin-right: 10rem; = 160px */
    mr40?: boolean;
    /** margin-bottom: 10rem; = 160px */
    mb40?: boolean;
    /** margin-left: 10rem; = 160px */
    ml40?: boolean;
    /** margin: 11rem; = 176px */
    m44?: boolean;
    /** margin-left: 11rem; = 176px \nmargin-right: 11rem; = 176px */
    mx44?: boolean;
    /** margin-top: 11rem; = 176px \nmargin-bottom: 11rem; = 176px */
    my44?: boolean;
    /** margin-inline-start: 11rem; = 176px */
    ms44?: boolean;
    /** margin-inline-end: 11rem; = 176px */
    me44?: boolean;
    /** margin-top: 11rem; = 176px */
    mt44?: boolean;
    /** margin-right: 11rem; = 176px */
    mr44?: boolean;
    /** margin-bottom: 11rem; = 176px */
    mb44?: boolean;
    /** margin-left: 11rem; = 176px */
    ml44?: boolean;
    /** margin: 12rem; = 192px */
    m48?: boolean;
    /** margin-left: 12rem; = 192px \nmargin-right: 12rem; = 192px */
    mx48?: boolean;
    /** margin-top: 12rem; = 192px \nmargin-bottom: 12rem; = 192px */
    my48?: boolean;
    /** margin-inline-start: 12rem; = 192px */
    ms48?: boolean;
    /** margin-inline-end: 12rem; = 192px */
    me48?: boolean;
    /** margin-top: 12rem; = 192px */
    mt48?: boolean;
    /** margin-right: 12rem; = 192px */
    mr48?: boolean;
    /** margin-bottom: 12rem; = 192px */
    mb48?: boolean;
    /** margin-left: 12rem; = 192px */
    ml48?: boolean;
    /** margin: 13rem; = 208px */
    m52?: boolean;
    /** margin-left: 13rem; = 208px \nmargin-right: 13rem; = 208px */
    mx52?: boolean;
    /** margin-top: 13rem; = 208px \nmargin-bottom: 13rem; = 208px */
    my52?: boolean;
    /** margin-inline-start: 13rem; = 208px */
    ms52?: boolean;
    /** margin-inline-end: 13rem; = 208px */
    me52?: boolean;
    /** margin-top: 13rem; = 208px */
    mt52?: boolean;
    /** margin-right: 13rem; = 208px */
    mr52?: boolean;
    /** margin-bottom: 13rem; = 208px */
    mb52?: boolean;
    /** margin-left: 13rem; = 208px */
    ml52?: boolean;
    /** margin: 14rem; = 224px */
    m56?: boolean;
    /** margin-left: 14rem; = 224px \nmargin-right: 14rem; = 224px */
    mx56?: boolean;
    /** margin-top: 14rem; = 224px \nmargin-bottom: 14rem; = 224px */
    my56?: boolean;
    /** margin-inline-start: 14rem; = 224px */
    ms56?: boolean;
    /** margin-inline-end: 14rem; = 224px */
    me56?: boolean;
    /** margin-top: 14rem; = 224px */
    mt56?: boolean;
    /** margin-right: 14rem; = 224px */
    mr56?: boolean;
    /** margin-bottom: 14rem; = 224px */
    mb56?: boolean;
    /** margin-left: 14rem; = 224px */
    ml56?: boolean;
    /** margin: 15rem; = 240px */
    m60?: boolean;
    /** margin-left: 15rem; = 240px \nmargin-right: 15rem; = 240px */
    mx60?: boolean;
    /** margin-top: 15rem; = 240px \nmargin-bottom: 15rem; = 240px */
    my60?: boolean;
    /** margin-inline-start: 15rem; = 240px */
    ms60?: boolean;
    /** margin-inline-end: 15rem; = 240px */
    me60?: boolean;
    /** margin-top: 15rem; = 240px */
    mt60?: boolean;
    /** margin-right: 15rem; = 240px */
    mr60?: boolean;
    /** margin-bottom: 15rem; = 240px */
    mb60?: boolean;
    /** margin-left: 15rem; = 240px */
    ml60?: boolean;
    /** margin: 16rem; = 256px */
    m64?: boolean;
    /** margin-left: 16rem; = 256px \nmargin-right: 16rem; = 256px */
    mx64?: boolean;
    /** margin-top: 16rem; = 256px \nmargin-bottom: 16rem; = 256px */
    my64?: boolean;
    /** margin-inline-start: 16rem; = 256px */
    ms64?: boolean;
    /** margin-inline-end: 16rem; = 256px */
    me64?: boolean;
    /** margin-top: 16rem; = 256px */
    mt64?: boolean;
    /** margin-right: 16rem; = 256px */
    mr64?: boolean;
    /** margin-bottom: 16rem; = 256px */
    mb64?: boolean;
    /** margin-left: 16rem; = 256px */
    ml64?: boolean;
    /** margin: 18rem; = 288px */
    m72?: boolean;
    /** margin-left: 18rem; = 288px \nmargin-right: 18rem; = 288px */
    mx72?: boolean;
    /** margin-top: 18rem; = 288px \nmargin-bottom: 18rem; = 288px */
    my72?: boolean;
    /** margin-inline-start: 18rem; = 288px */
    ms72?: boolean;
    /** margin-inline-end: 18rem; = 288px */
    me72?: boolean;
    /** margin-top: 18rem; = 288px */
    mt72?: boolean;
    /** margin-right: 18rem; = 288px */
    mr72?: boolean;
    /** margin-bottom: 18rem; = 288px */
    mb72?: boolean;
    /** margin-left: 18rem; = 288px */
    ml72?: boolean;
    /** margin: 20rem; = 320px */
    m80?: boolean;
    /** margin-left: 20rem; = 320px \nmargin-right: 20rem; = 320px */
    mx80?: boolean;
    /** margin-top: 20rem; = 320px \nmargin-bottom: 20rem; = 320px */
    my80?: boolean;
    /** margin-inline-start: 20rem; = 320px */
    ms80?: boolean;
    /** margin-inline-end: 20rem; = 320px */
    me80?: boolean;
    /** margin-top: 20rem; = 320px */
    mt80?: boolean;
    /** margin-right: 20rem; = 320px */
    mr80?: boolean;
    /** margin-bottom: 20rem; = 320px */
    mb80?: boolean;
    /** margin-left: 20rem; = 320px */
    ml80?: boolean;
    /** margin: 24rem; = 384px */
    m96?: boolean;
    /** margin-left: 24rem; = 384px \nmargin-right: 24rem; = 384px */
    mx96?: boolean;
    /** margin-top: 24rem; = 384px \nmargin-bottom: 24rem; = 384px */
    my96?: boolean;
    /** margin-inline-start: 24rem; = 384px */
    ms96?: boolean;
    /** margin-inline-end: 24rem; = 384px */
    me96?: boolean;
    /** margin-top: 24rem; = 384px */
    mt96?: boolean;
    /** margin-right: 24rem; = 384px */
    mr96?: boolean;
    /** margin-bottom: 24rem; = 384px */
    mb96?: boolean;
    /** margin-left: 24rem; = 384px */
    ml96?: boolean;
    /** margin: auto; */
    mAuto?: boolean;
    /** margin-left: auto; \nmargin-right: auto; */
    mxAuto?: boolean;
    /** margin-top: auto; \nmargin-bottom: auto; */
    myAuto?: boolean;
    /** margin-inline-start: auto; */
    msAuto?: boolean;
    /** margin-inline-end: auto; */
    meAuto?: boolean;
    /** margin-top: auto; */
    mtAuto?: boolean;
    /** margin-right: auto; */
    mrAuto?: boolean;
    /** margin-bottom: auto; */
    mbAuto?: boolean;
    /** margin-left: auto; */
    mlAuto?: boolean;
  }
}
