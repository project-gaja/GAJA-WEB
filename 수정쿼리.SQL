CREATE OR REPLACE PROCEDURE CUPAPP.SP_STA_AGGTN (I_GB IN  VARCHAR2, I_SYYMM IN  VARCHAR2, I_EYYMM IN  VARCHAR2, O_CODE OUT VARCHAR2, O_MSG OUT VARCHAR2)
IS

    /*---------------------------------------------
    -- 오브젝트명 : SP_STA_AGGTN
    -- 오브젝트설명: 통계 데이터 생성 프로시져
    --
    -- 고도화 이후 사용되는 프로시져
    -- 새로운 주문요청 데이터로 생성하는 경우 처리
    ---------------------------------------------*/

    --  [대상 테이블]
    --  일자별지점집계정보       T_STA_BDATE_BRCH_AGGTN_M
    --  년도별지점집계정보       T_STA_BYEAR_BRCH_AGGTN_M
    --  일자별지점반환집계정보     T_STA_BDATE_BRCH_RETN_AGGTN_M

    ------------------------------------------------------
    -- 2022-11-18 김동진 일자별지점반환집계정보 T_STA_BDATE_BRCH_RETN_AGGTN_M SELECT INSERT 시 반환기기구분 RETN_DEVICE_CLSS_CD 'C06004' 반환수집소 추가
    -- 2022-11-18 김동진 일자별지점집계정보   T_STA_BDATE_BRCH_AGGTN_M SELECT INSERT 시 지점 BRCH_ID, 지역구분코드 REGIN_CLSS_CD 값을 라벨 ORDER -> 라벨 REQ 정보 변경
	  -- 2022-11-18 김동진 일자별지점집계정보   T_STA_BDATE_BRCH_AGGTN_M SELECT INSERT 시 용기재질구분 CTNR_MAT_CD 기타컵 추가 A02000
	  -- 2022-11-18 김동진 년도별지점집계정보   T_STA_BYEAR_BRCH_AGGTN_M SELECT INSERT 시 용기재질구분 CTNR_MAT_CD 기타컵 추가 A02000
    -- 2022-11-18 김동진 일자별지점집계정보   T_STA_BDATE_BRCH_AGGTN_M 집계년월 AGGTN_YYMM 추가
    -- 2022-11-28 김동진 일자별지점집계정보    T_STA_BDATE_BRCH_AGGTN_M 반환 쿼리에 RVM 포함
    -- 2022-12-01 김동진 년도별지점집계정보 T_STA_BYEAR_BRCH_AGGTN_M 반환 쿼리에 RVM 포함

    ------------------------------------------------------


    v_MSG    VARCHAR2(100)    := '';       -- 처리내용
    v_SDATE  VARCHAR2(8)      := '';       -- 조회시작일자
    v_EDATE  VARCHAR2(8)      := '';       -- 조회종료일자
    v_SYYMM  VARCHAR2(6)      := '';       -- 조회시작년월
    v_EYYMM  VARCHAR2(6)      := '';       -- 조회종료년월


BEGIN

    IF TO_DATE(I_SYYMM,'YYYYMM') > TO_DATE(I_EYYMM,'YYYYMM') THEN

        O_CODE := 'FAIL';
        O_MSG  := '입력한 날짜가 잘못되었습니다.';

        RETURN;

    END IF;

    IF I_SYYMM = '' OR I_SYYMM IS NULL THEN
        v_SDATE := '20220101';
        v_SYYMM := '202201';
    ELSE
        v_SDATE := I_SYYMM;
        v_SYYMM := SUBSTR(I_SYYMM,0,6);
    END IF;

    IF I_EYYMM = '' OR I_EYYMM IS NULL THEN
        v_EDATE := TO_CHAR(SYSDATE,'YYYYMMDD');
        v_EYYMM := TO_CHAR(SYSDATE,'YYYYMM');
    ELSE
        v_EDATE := I_EYYMM;
        v_EYYMM := SUBSTR(I_EYYMM,0,6);
    END IF;



  dbms_output.put_line ('------------------I_GB : ' || I_GB);
    --  일자별지점집계정보
    IF I_GB = '0' OR I_GB = '1' THEN

            BEGIN
                  DELETE  T_STA_BDATE_BRCH_AGGTN_M
                  WHERE   1=1
                  AND    AGGTN_YYMM >= I_SYYMM   -- 조회시작일자
                  AND    AGGTN_YYMM <= I_EYYMM   -- 조회종료일자
                  ;
                  EXCEPTION
                  WHEN OTHERS THEN
                      O_CODE    := 'FAIL';
                      O_MSG     := SQLERRM;
                      ROLLBACK;
                      RETURN;
              END;

            INSERT INTO T_STA_BDATE_BRCH_AGGTN_M
            (
                  AGGTN_YMD
                , BRCH_ID
                , REGIN_CLSS_CD
                , AGGTN_YYMM
                , RTRV_CNT
                , RUSE_CNT
                , PAPER_STND_APLY_CNT
                , PAPER_STND_RETN_CNT
                , PAPER_NSTND_APLY_CNT
                , PAPER_NSTND_RETN_CNT
                , PLSTC_STND_APLY_CNT
                , PLSTC_STND_RETN_CNT
                , PLSTC_NSTND_APLY_CNT
                , PLSTC_NSTND_RETN_CNT
                , ETC_NSTND_APLY_CNT
                , ETC_NSTND_RETN_CNT
                , REG_ID
                , REG_DT
                , MOD_ID
                , MOD_DT
            )
            SELECT DATA_DT
                 , BRCH_ID
                 , REGIN_CLSS_CD
                 , MIN(SUBSTR(DATA_DT, 0, 6))        AS AGGTN_YYMM
                 , SUM(RTRV_CNT)                     AS RTRV_CNT
                 , SUM(RUSE_CNT)                     AS RUSE_CNT
                 , SUM(PAPER_STND_APLY_CNT)          AS PAPER_STND_APLY_CNT
                 , SUM(PAPER_STND_RETN_CNT)          AS PAPER_STND_RETN_CNT
                 , SUM(PAPER_NSTND_APLY_CNT)         AS PAPER_NSTND_APLY_CNT
                 , SUM(PAPER_NSTND_RETN_CNT)         AS PAPER_NSTND_RETN_CNT
                 , SUM(PLSTC_STND_APLY_CNT)          AS PLSTC_STND_APLY_CNT
                 , SUM(PLSTC_STND_RETN_CNT)          AS PLSTC_STND_RETN_CNT
                 , SUM(PLSTC_NSTND_APLY_CNT)         AS PLSTC_NSTND_APLY_CNT
                 , SUM(PLSTC_NSTND_RETN_CNT)         AS PLSTC_NSTND_RETN_CNT
                 , SUM(ETC_NSTND_APLY_CNT)           AS ETC_NSTND_APLY_CNT
                 , SUM(ETC_NSTND_RETN_CNT)           AS ETC_NSTND_RETN_CNT
                 , 'BATCH91'
                 , SYSDATE
                 , 'BATCH91'
                 , SYSDATE
              FROM (
                    /* 종이, 플라스틱 기타 신청 건수 */
                    SELECT DATA_DT                                                                                                   --집계일자
                         , BRCH_ID                                                                                                   --지점ID
                         , REGIN_CLSS_CD                                                                                             --지역구분코드
                         , 0                                                                             AS RTRV_CNT                 --회수건수
                         , 0                                                                             AS RUSE_CNT                 --재활용건수
                         , SUM(DECODE(CTNR_MAT_CD,'A02001',DECODE(CTNR_STND_CD,'A03001',SALE_QTY, 0), 0)) AS PAPER_STND_APLY_CNT      /* 신청_종이_표준*/
                         , SUM(DECODE(CTNR_MAT_CD,'A02001',DECODE(CTNR_STND_CD,'A03002',SALE_QTY, 0), 0)) AS PAPER_NSTND_APLY_CNT     /* 신청_종이_비표준*/
                         , SUM(DECODE(CTNR_MAT_CD,'A02002',DECODE(CTNR_STND_CD,'A03001',SALE_QTY, 0), 0)) AS PLSTC_STND_APLY_CNT      /* 신청_PET_표준  */
                         , SUM(DECODE(CTNR_MAT_CD,'A02002',DECODE(CTNR_STND_CD,'A03002',SALE_QTY, 0), 0)) AS PLSTC_NSTND_APLY_CNT     /* 신청_PET_비표준 */
                         , SUM(DECODE(CTNR_MAT_CD,'A02000',SALE_QTY, 0))                                  AS ETC_NSTND_APLY_CNT       /* 신청_기타_비표준 */
                         , 0                                                                             AS PAPER_STND_RETN_CNT      --반환_종이_표준
                         , 0                                                                             AS PAPER_NSTND_RETN_CNT     --반환_종이_비표준
                         , 0                                                                             AS PLSTC_STND_RETN_CNT      --반환_PET_표준
                         , 0                                                                             AS PLSTC_NSTND_RETN_CNT     --반환_PET_비표준
                         , 0                                                                             AS ETC_NSTND_RETN_CNT       --반환_기타_비표준
                    FROM (
														SELECT
															     sale.SALE_YMD                   AS DATA_DT
														     , sale.BRCH_ID                    AS BRCH_ID                     -- 2022-11-18 김동진 일자별지점집계정보   T_STA_BDATE_BRCH_AGGTN_M SELECT INSERT 시 지점 BRCH_ID, 지역구분코드 REGIN_CLSS_CD 값을 라벨 ORDER -> 라벨 REQ 정보 변경
														     , brch.REGIN_CLSS_CD              AS REGIN_CLSS_CD               -- 2022-11-18 김동진 일자별지점집계정보   T_STA_BDATE_BRCH_AGGTN_M SELECT INSERT 시 지점 BRCH_ID, 지역구분코드 REGIN_CLSS_CD 값을 라벨 ORDER -> 라벨 REQ 정보 변경
														     , cntr.CTNR_MAT_CD                AS CTNR_MAT_CD
														     , cntr.CTNR_STND_CD               AS CTNR_STND_CD
														     , sale.SALE_QTY                   AS SALE_QTY                    -- 2023.01.11 김호성 판매수량으로 변경
														FROM
															T_LBL_BRCH_SALE_L sale, /*지점판매내역*/
															T_IFO_STD_CTNR_M  cntr, /*기준용기정보*/
															T_IFO_BRCH_M      brch  /*요청지점정보*/
														WHERE
															sale.CTNR_CD = cntr.CTNR_CD
															AND sale.BRCH_ID = brch.BRCH_ID
															AND sale.DEL_YN  = 'N'
															AND TO_DATE(sale.SALE_YMD,'yyyymmdd') BETWEEN TO_DATE(I_SYYMM, 'YYYYMM') AND LAST_DAY(TO_DATE(I_EYYMM, 'YYYYMM')) +1
                         )
                    GROUP BY DATA_DT
                           , BRCH_ID
                           , REGIN_CLSS_CD

                    UNION ALL

                    /* 종이, 플라스틱 기타 반환 건수 */
                    SELECT DATA_DT                                                                  --집계일자
                         , BRCH_ID                                                                  --지점ID
                         , REGIN_CLSS_CD                                                            --지역구분코드
                         , 0                                     AS RTRV_CNT                        --회수건수
                         , 0                                     AS RUSE_CNT                        --재활용건수
                         , 0                                     AS PAPER_STND_APLY_CNT             --신청_종이_표준
                         , 0                                     AS PAPER_NSTND_APLY_CNT            --신청_종이_비표준
                         , 0                                     AS PLSTC_STND_APLY_CNT             --신청_PET_표준
                         , 0                                     AS PLSTC_NSTND_APLY_CNT            --신청_PET_비표준
                         , 0                                     AS ETC_NSTND_APLY_CNT              --신청_기타_비표준
                         , SUM(DECODE(CTNR_MAT_CD,'A02001',DECODE(CTNR_STND_CD,'A03001',QTY, 0), 0)) AS PAPER_STND_RETN_CNT      /* 반환_종이_표준*/
                         , SUM(DECODE(CTNR_MAT_CD,'A02001',DECODE(CTNR_STND_CD,'A03002',QTY, 0), 0)) AS PAPER_NSTND_RETN_CNT     /* 반환_종이_비표준*/
                         , SUM(DECODE(CTNR_MAT_CD,'A02002',DECODE(CTNR_STND_CD,'A03001',QTY, 0), 0)) AS PLSTC_STND_RETN_CNT      /* 반환_PET_표준  */
                         , SUM(DECODE(CTNR_MAT_CD,'A02002',DECODE(CTNR_STND_CD,'A03002',QTY, 0), 0)) AS PLSTC_NSTND_RETN_CNT     /* 반환_PET_비표준 */
                         , SUM(DECODE(CTNR_MAT_CD,'A02000',QTY, 0))                                  AS ETC_NSTND_RETN_CNT       /* 반환_기타_비표준 */
                    FROM (
                            SELECT TO_CHAR(A.RETN_DT, 'YYYYMMDD') AS DATA_DT
                                 , NVL(A.BRCH_ID, 'BC00000000')                 AS BRCH_ID
                                 , NVL(B.REGIN_CLSS_CD,D.REGIN_CLSS_CD)                AS REGIN_CLSS_CD
                                 , C.CTNR_MAT_CD                  AS CTNR_MAT_CD
                                 , C.CTNR_STND_CD                 AS CTNR_STND_CD
                                 , 1                              AS QTY
                            FROM   T_RTV_DPS_RETN_REQ_D A      /* 보증금반환요청상세 */
                                 , T_IFO_BRCH_M         B      /* 지점정보     */
                                 , T_IFO_STD_CTNR_M     C
                                 , T_IFO_RVM_M D  -- 2022-11-28 김동진 일자별지점집계정보 T_STA_BDATE_BRCH_AGGTN_M 반환 쿼리에 RVM 포함
                            WHERE  1=1
                            AND    A.BRCH_ID = B.BRCH_ID(+)
                            AND    A.RVM_ID = D.RVM_ID(+)
                            AND    A.CTNR_CD = C.CTNR_CD
                            AND    A.RETN_YN = 'Y'
							AND    A.RETN_DT BETWEEN TO_DATE(I_SYYMM, 'YYYYMM') AND LAST_DAY(TO_DATE(I_EYYMM, 'YYYYMM')) +1
                          )
                    GROUP BY DATA_DT
                           , BRCH_ID
                           , REGIN_CLSS_CD

                    UNION ALL

                    /* 회수,재활용  신청 건수 */
                    SELECT DATA_DT                                                                   --집계일자
                         , BRCH_ID                                                                   --지점ID
                         , REGIN_CLSS_CD                                                             --지역구분코드
                         , SUM(RTRV_QTY)                          AS RTRV_CNT                        --회수건수
                         , 0                                      AS RUSE_CNT                        --재활용건수
                         , 0                                      AS PAPER_STND_APLY_CNT             /* 신청_종이_표준*/
                         , 0                                      AS PAPER_NSTND_APLY_CNT            /* 신청_종이_비표준*/
                         , 0                                      AS PLSTC_STND_APLY_CNT             /* 신청_PET_표준  */
                         , 0                                      AS PLSTC_NSTND_APLY_CNT            /* 신청_PET_비표준 */
                         , 0                                      AS ETC_NSTND_APLY_CNT              /* 신청_기타_비표준 */
                          ,0                                      AS PAPER_STND_RETN_CNT             --반환_종이_표준
                          ,0                                      AS PAPER_NSTND_RETN_CNT            --반환_종이_비표준
                          ,0                                      AS PLSTC_STND_RETN_CNT             --반환_PET_표준
                          ,0                                      AS PLSTC_NSTND_RETN_CNT            --반환_PET_비표준
                          ,0                                      AS ETC_NSTND_RETN_CNT              --반환_기타_비표준
                    FROM (
                            SELECT TO_CHAR(A.RTRV_REQ_DT,'YYYYMMDD') AS DATA_DT
                                 , A.REQ_BRCH_ID                     AS BRCH_ID
                                 , C.REGIN_CLSS_CD                   AS REGIN_CLSS_CD
                                , NVL(B.HNTOV_NO, 0)                 AS HNTOV_NO
                                 , B.RTRV_QTY AS RTRV_QTY
                            FROM   T_RTV_RTRV_REQ_M A                                                /* 회수요청정보 */
                                 , T_RTV_RTRV_REQ_D B                                                /* 회수요청상세 */
                                 , T_IFO_BRCH_M C                                                    /* 지점정보     */
                            WHERE 1=1
                            AND   A.RTRV_REQ_NO = B.RTRV_REQ_NO
                            AND   A.REQ_BRCH_ID = C.BRCH_ID
                            AND   A.RTRV_REQ_STAT_CD = 'C02005'        --C02005 회수처리완료
														AND   A.RTRV_REQ_DT BETWEEN TO_DATE(I_SYYMM, 'YYYYMM') AND LAST_DAY(TO_DATE(I_EYYMM, 'YYYYMM')) +1
                          )
                    GROUP BY DATA_DT
                           , BRCH_ID
                           , REGIN_CLSS_CD

                    UNION ALL

                    /* 재활용  신청 건수 */
                    SELECT DATA_DT                                                                   --집계일자
                         , BRCH_ID                                                                   --지점ID
                         , REGIN_CLSS_CD                                                             --지역구분코드
                         , 0                                      AS RTRV_CNT                        --회수건수
                         , SUM(DECODE(HNTOV_NO, 0, 0, RTRV_QTY))  AS RUSE_CNT                        --재활용건수
                         , 0                                      AS PAPER_STND_APLY_CNT             /* 신청_종이_표준*/
                         , 0                                      AS PAPER_NSTND_APLY_CNT            /* 신청_종이_비표준*/
                         , 0                                      AS PLSTC_STND_APLY_CNT             /* 신청_PET_표준  */
                         , 0                                      AS PLSTC_NSTND_APLY_CNT            /* 신청_PET_비표준 */
                         , 0                                      AS ETC_NSTND_APLY_CNT              /* 신청_기타_비표준 */
                          ,0                                      AS PAPER_STND_RETN_CNT             --반환_종이_표준
                          ,0                                      AS PAPER_NSTND_RETN_CNT            --반환_종이_비표준
                          ,0                                      AS PLSTC_STND_RETN_CNT             --반환_PET_표준
                          ,0                                      AS PLSTC_NSTND_RETN_CNT            --반환_PET_비표준
                          ,0                                      AS ETC_NSTND_RETN_CNT              --반환_기타_비표준
                    FROM (
                            SELECT hntov.HNTOV_YMD                   AS DATA_DT
                                 , A.REQ_BRCH_ID                     AS BRCH_ID
                                 , C.REGIN_CLSS_CD                   AS REGIN_CLSS_CD
                                , NVL(B.HNTOV_NO, 0)                 AS HNTOV_NO
                                 , B.RTRV_QTY AS RTRV_QTY
                            FROM   T_RTV_RTRV_REQ_M A                                                /* 회수요청정보 */
                                 , T_RTV_RTRV_REQ_D B                                                /* 회수요청상세 */
                                 , T_IFO_BRCH_M C                                                    /* 지점정보     */
                                 , T_RTV_RUSE_HNTOV_M hntov                                          /* 재활용인수인계 */
                            WHERE 1=1
                            AND   A.RTRV_REQ_NO = B.RTRV_REQ_NO
                            AND   A.REQ_BRCH_ID = C.BRCH_ID
                            AND   A.RTRV_REQ_STAT_CD = 'C02005'        --C02005 회수처리완료
                            AND   B.HNTOV_NO IS NOT NULL
                            AND   B.HNTOV_NO = hntov.HNTOV_NO
														AND   TO_DATE(hntov.HNTOV_YMD,'YYYYMMDD') BETWEEN TO_DATE(I_SYYMM, 'YYYYMM') AND LAST_DAY(TO_DATE(I_EYYMM, 'YYYYMM')) +1
                          )
                    GROUP BY DATA_DT
                           , BRCH_ID
                           , REGIN_CLSS_CD

            )
            GROUP BY DATA_DT
                   , BRCH_ID
                   , REGIN_CLSS_CD
            ;


            v_MSG := v_MSG || ' (일자별지점집계정보) ';

    END IF;


    --  년도별지점집계정보
    IF I_GB = '0' OR I_GB = '2' THEN

            BEGIN
                  DELETE  T_STA_BYEAR_BRCH_AGGTN_M
                  WHERE   1=1
                  AND    AGGTN_YYMM >= I_SYYMM   -- 조회시작일자
                  AND    AGGTN_YYMM <= I_EYYMM   -- 조회종료일자
                  ;
                  EXCEPTION
                  WHEN OTHERS THEN
                      O_CODE    := 'FAIL';
                      O_MSG     := SQLERRM;
                      ROLLBACK;
                      RETURN;
             END;

            INSERT INTO T_STA_BYEAR_BRCH_AGGTN_M
            (
                  AGGTN_YYMM
                , BRCH_ID
                , REGIN_CLSS_CD
                , RTRV_CNT
                , RUSE_CNT
                , PAPER_STND_APLY_CNT
                , PAPER_STND_RETN_CNT
                , PAPER_NSTND_APLY_CNT
                , PAPER_NSTND_RETN_CNT
                , PLSTC_STND_APLY_CNT
                , PLSTC_STND_RETN_CNT
                , PLSTC_NSTND_APLY_CNT
                , PLSTC_NSTND_RETN_CNT
                , ETC_NSTND_APLY_CNT
                , ETC_NSTND_RETN_CNT
                , REG_ID
                , REG_DT
                , MOD_ID
                , MOD_DT
            )
            SELECT DATA_DT
                 , BRCH_ID
                 , REGIN_CLSS_CD
                 , SUM(RTRV_CNT)                AS RTRV_CNT
                 , SUM(RUSE_CNT)                AS RUSE_CNT
                 , SUM(PAPER_STND_APLY_CNT)     AS PAPER_STND_APLY_CNT
                 , SUM(PAPER_STND_RETN_CNT)     AS PAPER_STND_RETN_CNT
                 , SUM(PAPER_NSTND_APLY_CNT)    AS PAPER_NSTND_APLY_CNT
                 , SUM(PAPER_NSTND_RETN_CNT)    AS PAPER_NSTND_RETN_CNT
                 , SUM(PLSTC_STND_APLY_CNT)     AS PLSTC_STND_APLY_CNT
                 , SUM(PLSTC_STND_RETN_CNT)     AS PLSTC_STND_RETN_CNT
                 , SUM(PLSTC_NSTND_APLY_CNT)    AS PLSTC_NSTND_APLY_CNT
                 , SUM(PLSTC_NSTND_RETN_CNT)    AS PLSTC_NSTND_RETN_CNT
                 , SUM(ETC_NSTND_APLY_CNT)      AS ETC_NSTND_APLY_CNT
                 , SUM(ETC_NSTND_RETN_CNT)      AS ETC_NSTND_RETN_CNT
                 , 'BATCH92'
                 , SYSDATE
                 , 'BATCH92'
                 , SYSDATE
            FROM (
                    /* 종이, 플라스틱 기타 라벨 신청건수 */
                    SELECT DATA_DT                                                                --집계일자
                         , BRCH_ID                                                                --지점ID
                         , REGIN_CLSS_CD                                                          --지역구분코드
                         , 0                                            AS RTRV_CNT               --회수건수
                         , 0                                            AS RUSE_CNT               --재활용건수
                         , SUM(DECODE(CTNR_MAT_CD,'A02001',DECODE(CTNR_STND_CD,'A03001',LB_REQ_QTY, 0), 0)) AS PAPER_STND_APLY_CNT      /* 신청_종이_표준*/
                         , SUM(DECODE(CTNR_MAT_CD,'A02001',DECODE(CTNR_STND_CD,'A03002',LB_REQ_QTY, 0), 0)) AS PAPER_NSTND_APLY_CNT     /* 신청_종이_비표준*/
                         , SUM(DECODE(CTNR_MAT_CD,'A02002',DECODE(CTNR_STND_CD,'A03001',LB_REQ_QTY, 0), 0)) AS PLSTC_STND_APLY_CNT      /* 신청_PET_표준  */
                         , SUM(DECODE(CTNR_MAT_CD,'A02002',DECODE(CTNR_STND_CD,'A03002',LB_REQ_QTY, 0), 0)) AS PLSTC_NSTND_APLY_CNT     /* 신청_PET_비표준 */
                         , SUM(DECODE(CTNR_MAT_CD,'A02000',LB_REQ_QTY, 0))                                  AS ETC_NSTND_APLY_CNT       /* 신청_기타_비표준 */
                         , 0                                            AS PAPER_STND_RETN_CNT   --반환_종이_표준
                         , 0                                            AS PAPER_NSTND_RETN_CNT  --반환_종이_비표준
                         , 0                                            AS PLSTC_STND_RETN_CNT   --반환_PET_표준
                         , 0                                            AS PLSTC_NSTND_RETN_CNT  --반환_PET_비표준
                         , 0                                            AS ETC_NSTND_RETN_CNT    --반환_기타_비표준
                    FROM (
                             SELECT TO_CHAR(A.LB_ORDR_DT, 'YYYYMM') AS DATA_DT
                                 , B.REQ_BRCH_ID                      AS BRCH_ID                     -- 2022-11-18 김동진 일자별지점집계정보   T_STA_BDATE_BRCH_AGGTN_M SELECT INSERT 시 지점 BRCH_ID, 지역구분코드 REGIN_CLSS_CD 값을 라벨 ORDER -> 라벨 REQ 정보 변경
                                 , E.REGIN_CLSS_CD                    AS REGIN_CLSS_CD               -- 2022-11-18 김동진 일자별지점집계정보   T_STA_BDATE_BRCH_AGGTN_M SELECT INSERT 시 지점 BRCH_ID, 지역구분코드 REGIN_CLSS_CD 값을 라벨 ORDER -> 라벨 REQ 정보 변경
                                 , D.CTNR_MAT_CD                      AS CTNR_MAT_CD
                                 , D.CTNR_STND_CD                     AS CTNR_STND_CD
                                 , C.LB_REQ_QTY                       AS LB_REQ_QTY
                            FROM   T_LBL_LB_ORDR_M      A            /* 라벨신청정보 */
                                 , T_LBL_LB_REQ_M       B
                                 , T_LBL_LB_REQ_PRDT_M  C
                                 , T_IFO_STD_CTNR_M     D
                                 , T_IFO_BRCH_M    E            /* 요청지점정보*/
                            WHERE  1=1
                            AND    A.LB_ORDR_NO   = B.LB_ORDR_NO
							AND    A.LB_ORDR_STAT_CD = 'C37003'
                            AND    B.LB_REQ_NO    = C.LB_REQ_NO
                            AND    B.REQ_BRCH_ID  = E.BRCH_ID
                            AND    C.CTNR_CD      = D.CTNR_CD
							AND    A.LB_ORDR_DT BETWEEN TO_DATE(I_SYYMM, 'YYYYMM') AND LAST_DAY(TO_DATE(I_EYYMM, 'YYYYMM')) +1

                         )
                    GROUP BY DATA_DT
                           , BRCH_ID
                           , REGIN_CLSS_CD

                    UNION ALL

                    /* 종이, 플라스틱 기타 반환 신청건수 */
                    SELECT DATA_DT                                                               --집계일자
                         , BRCH_ID                                                               --지점ID
                         , REGIN_CLSS_CD                                                         --지역구분코드
                         , 0                                     AS RTRV_CNT                     --회수건수
                         , 0                                     AS RUSE_CNT                     --재활용건수
                         , 0                                     AS PAPER_STND_APLY_CNT          --신청_종이_표준
                         , 0                                     AS PAPER_NSTND_APLY_CNT         --신청_종이_비표준
                         , 0                                     AS PLSTC_STND_APLY_CNT          --신청_PET_표준
                         , 0                                     AS PLSTC_NSTND_APLY_CNT         --신청_PET_비표준
                         , 0                                     AS ETC_NSTND_APLY_CNT           --신청_기타_비표준
                         , SUM(DECODE(CTNR_MAT_CD,'A02001',DECODE(CTNR_STND_CD,'A03001',QTY, 0), 0)) AS PAPER_STND_RETN_CNT      /* 반환_종이_표준*/
                         , SUM(DECODE(CTNR_MAT_CD,'A02001',DECODE(CTNR_STND_CD,'A03002',QTY, 0), 0)) AS PAPER_NSTND_RETN_CNT     /* 반환_종이_비표준*/
                         , SUM(DECODE(CTNR_MAT_CD,'A02002',DECODE(CTNR_STND_CD,'A03001',QTY, 0), 0)) AS PLSTC_STND_RETN_CNT      /* 반환_PET_표준  */
                         , SUM(DECODE(CTNR_MAT_CD,'A02002',DECODE(CTNR_STND_CD,'A03002',QTY, 0), 0)) AS PLSTC_NSTND_RETN_CNT     /* 반환_PET_비표준 */
                         , SUM(DECODE(CTNR_MAT_CD,'A02000',QTY, 0))                                  AS ETC_NSTND_RETN_CNT       /* 반환_기타_비표준 */
                    FROM (

							SELECT TO_CHAR(A.RETN_DT, 'YYYYMM') AS DATA_DT
                                 , NVL(A.BRCH_ID, 'BC00000000')                 AS BRCH_ID
                                 , NVL(B.REGIN_CLSS_CD,D.REGIN_CLSS_CD)                AS REGIN_CLSS_CD
                                 , C.CTNR_MAT_CD                  AS CTNR_MAT_CD
                                 , C.CTNR_STND_CD                 AS CTNR_STND_CD
                                 , 1                              AS QTY
                            FROM   T_RTV_DPS_RETN_REQ_D A      /* 보증금반환요청상세 */
                                 , T_IFO_BRCH_M         B      /* 지점정보     */
                                 , T_IFO_STD_CTNR_M     C
                                 , T_IFO_RVM_M          D      -- 2022-12-01 김동진 년도별지점집계정보 T_STA_BYEAR_BRCH_AGGTN_M 반환 쿼리에 RVM 포함
                            WHERE  1=1
                            AND    A.BRCH_ID = B.BRCH_ID(+)
                            AND    A.RVM_ID = D.RVM_ID(+)
                            AND    A.CTNR_CD = C.CTNR_CD
                            AND    A.RETN_YN = 'Y'
							AND    A.RETN_DT BETWEEN TO_DATE(I_SYYMM, 'YYYYMM') AND LAST_DAY(TO_DATE(I_EYYMM, 'YYYYMM'))  +1
                          )
                    GROUP BY DATA_DT
                           , BRCH_ID
                           , REGIN_CLSS_CD

                    UNION ALL

                     /* 회수,재활용  신청건수 */
                    SELECT DATA_DT --집계일자
                         , BRCH_ID  --지점ID
                         , REGIN_CLSS_CD --지역구분코드
                         , SUM(DECODE(HNTOV_NO, 0, 0, RTRV_QTY))    AS RTRV_CNT --회수건수
                         , SUM(DECODE(HNTOV_NO, 0, RTRV_QTY, 0))    AS RUSE_CNT --재활용건수
                         , 0                                        AS PAPER_STND_APLY_CNT       /* 신청_종이_표준*/
                         , 0                                        AS PAPER_NSTND_APLY_CNT      /* 신청_종이_비표준*/
                         , 0                                        AS PLSTC_STND_APLY_CNT       /* 신청_PET_표준  */
                         , 0                                        AS PLSTC_NSTND_APLY_CNT      /* 신청_PET_비표준 */
                         , 0                                        AS ETC_NSTND_APLY_CNT        /* 신청_기타_비표준 */
                         , 0                                        AS PAPER_STND_RETN_CNT       --반환_종이_표준
                         , 0                                        AS PAPER_NSTND_RETN_CNT      --반환_종이_비표준
                         , 0                                        AS PLSTC_STND_RETN_CNT       --반환_PET_표준
                         , 0                                        AS PLSTC_NSTND_RETN_CNT      --반환_PET_비표준
                         , 0                                        AS ETC_NSTND_RETN_CNT        --반환_기타_비표준
                    FROM (
                            SELECT TO_CHAR(A.RTRV_REQ_DT, 'YYYYMM') AS DATA_DT
                                 , A.REQ_BRCH_ID                    AS BRCH_ID
                                 , C.REGIN_CLSS_CD                  AS REGIN_CLSS_CD
                                 , NVL(B.HNTOV_NO, 0)               AS HNTOV_NO
                                 , B.RTRV_QTY AS RTRV_QTY
                            FROM   T_RTV_RTRV_REQ_M A                                            /* 회수요청정보 */
                                 , T_RTV_RTRV_REQ_D B                                            /* 회수요청상세 */
                                 , T_IFO_BRCH_M C                                                /* 지점정보     */
                            WHERE  1=1
                            AND    A.RTRV_REQ_NO = B.RTRV_REQ_NO
                            AND    A.REQ_BRCH_ID = C.BRCH_ID
                            AND    A.RTRV_REQ_STAT_CD = 'C02005'
                            AND    B.HNTOV_NO IS NOT NULL
							AND    A.RTRV_REQ_DT BETWEEN TO_DATE(I_SYYMM, 'YYYYMM') AND LAST_DAY(TO_DATE(I_EYYMM, 'YYYYMM')) +1
                          )
                    GROUP BY DATA_DT
                           , BRCH_ID
                           , REGIN_CLSS_CD

            )
            GROUP BY DATA_DT
                   , BRCH_ID
                   , REGIN_CLSS_CD
            ;


            v_MSG := v_MSG || ' (년도별지점집계정보) ';

    END IF;


    --  일자별지점반환집계정보
    IF I_GB = '0' OR I_GB = '3' THEN

            BEGIN
                  DELETE  T_STA_BDATE_BRCH_RETN_AGGTN_M
                  WHERE   1=1
                  AND    AGGTN_YYMM >= I_SYYMM   -- 조회시작일자
                  AND    AGGTN_YYMM <= I_EYYMM   -- 조회종료일자
                  ;
                  EXCEPTION
                  WHEN OTHERS THEN
                      O_CODE    := 'FAIL';
                      O_MSG     := SQLERRM;
                      ROLLBACK;
                      RETURN;
             END;

            INSERT INTO T_STA_BDATE_BRCH_RETN_AGGTN_M
            (
                  AGGTN_YMD
                , BRCH_ID
                , AGGTN_YYMM
                , POS_APP_RETN_CNT
                , POS_CASH_RETN_CNT
                , APP_APP_RETN_CNT
                , APP_CASH_RETN_CNT
                , PBL_RVM_RETN_CNT
                , PRIV_RVM_RETN_CNT
                , REG_ID
                , REG_DT
                , MOD_ID
                , MOD_DT
            )
            SELECT AGGTN_YMD
                 , BRCH_ID
                 , MIN(SUBSTR(AGGTN_YMD, 0, 6))        AS AGGTN_YYMM
                 , SUM(DECODE(DPS_RETN_CLSS_CD, 'C03001', POS_QTY, 0))   AS POS_APP_RETN_CNT
                 , SUM(DECODE(DPS_RETN_CLSS_CD, 'C03002', POS_QTY, 0))   AS POS_CASH_RETN_CNT
                 , SUM(DECODE(DPS_RETN_CLSS_CD, 'C03001', APP_QTY, 0))   AS APP_APP_RETN_CNT
                 , SUM(DECODE(DPS_RETN_CLSS_CD, 'C03002', APP_QTY, 0))   AS APP_CASH_RETN_CNT
                 , SUM(DECODE(DPS_RETN_CLSS_CD, 'C03001', P_RVM_QTY, 0)) AS PBL_RVM_RETN_CNT
                 , SUM(DECODE(DPS_RETN_CLSS_CD, 'C03001', I_RVM_QTY, 0)) AS PRIV_RVM_RETN_CNT
                 , 'BATCH93'
                 , SYSDATE
                 , 'BATCH93'
                 , SYSDATE
            FROM (
                    SELECT TO_CHAR(A.RETN_DT, 'YYYYMMDD')                                                            AS AGGTN_YMD
                         , NVL(A.BRCH_ID, 'BC00000000')                                                              AS BRCH_ID
                         , A.DPS_RETN_CLSS_CD                                                                        AS DPS_RETN_CLSS_CD  -- 앱/현금 구분
                         , CASE WHEN A.RETN_DEVICE_CLSS_CD = 'C06001' THEN 1 ELSE 0 END                              AS POS_QTY           /* C06001 POS */
                         -- 2022-11-18 김동진 일자별지점반환집계정보 T_STA_BDATE_BRCH_RETN_AGGTN_M SELECT INSERT 시 반환기기구분 RETN_DEVICE_CLSS_CD 'C06004' 반환수집소 추가
                         , CASE WHEN A.RETN_DEVICE_CLSS_CD IN ('C06003', 'C06004') THEN 1 ELSE 0 END                 AS APP_QTY           /* C06003 판매자앱 */
                         , CASE WHEN A.RETN_DEVICE_CLSS_CD = 'C06002' AND B.RVM_CLSS_CD = 'B12001' THEN 1 ELSE 0 END AS P_RVM_QTY         /* C06002 RVM   B12001 공공 */
                         , CASE WHEN A.RETN_DEVICE_CLSS_CD = 'C06002' AND B.RVM_CLSS_CD = 'B12002' THEN 1 ELSE 0 END AS I_RVM_QTY         /* C06002 RVM   B12002 민간  */
                    FROM   T_RTV_DPS_RETN_REQ_D A                         /* 보증금반환요청상세 */
                         , T_IFO_RVM_M          B                         /* 무인회수기정보 */
                    WHERE  1=1
                    AND    A.RVM_ID = B.RVM_ID(+)
                    AND    A.RETN_YN = 'Y'                                /* 반환여부 Y */
					AND    A.RETN_DT BETWEEN TO_DATE(I_SYYMM, 'YYYYMM') AND LAST_DAY(TO_DATE(I_EYYMM, 'YYYYMM')) +1
                 )
            GROUP BY AGGTN_YMD
                   , BRCH_ID
            ;

            v_MSG := v_MSG || ' (일자별지점반환집계정보) ';


    END IF;


    O_CODE := 'SUCCESS';
    O_MSG  := '[' || v_MSG || ']가 처리되었습니다.' || 'v_SDATE['|| v_SDATE || '] v_EDATE[' || v_EDATE || '] v_SYYMM[' || v_SYYMM || '] v_EYYMM[' || v_EYYMM || ']';



EXCEPTION
WHEN OTHERS THEN
        O_CODE := 'FAIL';
        O_MSG  :=  O_MSG || SQLERRM;
        ROLLBACK;

END SP_STA_AGGTN;


