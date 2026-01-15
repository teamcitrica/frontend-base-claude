import { Container, Col } from "@citrica/objects";
import Link from "next/link";

const FooterCUI = () => {
  return (
    <>
      <footer
        className="h-[204px] pt-20"
        style={{
          background:
            "linear-gradient(91.06deg, #0D1321 -2.64%, #302967 107.97%)",
        }}
      >
        <Container noPadding className="flex items-center justify-around">
          <Col
            noPadding
            className="flex items-center justify-around  mb-3 only-lg"
            cols={{ lg: 3, md: 6, sm: 2 }}
          >
            <picture>
              <img alt="" src=" /img/home/Logo-galiz.png" />
            </picture>
          </Col>
          <Col noPadding cols={{ lg: 5, md: 3, sm: 2 }}>
            <h2 className=" letra-citrica mb-3">Gáliz Perú 2024</h2>
            <div className="letra-citrica-1 flex items-center gap-2">
              <h2 className="letra-citrica-2">Desarrollado por</h2>
              <img
                alt="Logo Cítrica"
                className="h-6 relative bottom-[7px]"
                src="/img/icons/citrica-logo-col.png"
              />
            </div>
          </Col>
          <Col
            className="flex  mb-3 only-lg-md-sm"
            cols={{ lg: 3, md: 3, sm: 2 }}
          >
            <div className="icon-footer-container ">
              <Link href="https://www.instagram.com/galizperu/" target="_blank">
                <picture>
                  <img
                    alt="inde icon"
                    className="h-11"
                    src="/img/icons/Instagram.png"
                  />
                </picture>
              </Link>
              <Link href="https://www.facebook.com/galizperu" target="_blank">
                <picture>
                  <img
                    alt="inde icon"
                    className="h-11"
                    src="/img/icons/Facebook.png"
                  />
                </picture>
              </Link>
              <Link
                href="https://www.linkedin.com/company/galizperu/"
                target="_blank"
              >
                <picture>
                  <img
                    alt="face icon"
                    className="h-11"
                    src="/img/icons/LinkedIn.png"
                  />
                </picture>
              </Link>
            </div>
          </Col>
        </Container>
      </footer>
    </>
  );
};

export default FooterCUI;
