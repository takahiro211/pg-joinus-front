import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
} from "@mui/material";
import * as React from "react";
import { FaqListEntity } from "../api/entities/FaqListEntity";
import { RepositoryFactory } from "../api/RepositoryFactory";
import { Labels } from "../utils/Consts";
import withRoot from "../withRoot";
import ProductCategories from "./modules/views/ProductCategories";
import Typography from "./modules/components/Typography";
import ProjectCard from "./modules/components/ProjectCard";
import ProjectDetailCard from "./modules/components/ProjectDetailContent";
import { useParams } from "react-router-dom";
import { LegendToggle } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Faq() {
  const [faqList, setFaqList] = React.useState<FaqListEntity[]>([]);

  React.useEffect(() => {
    userResponse();
  }, []);

  // API
  const userRepository = RepositoryFactory.get("faq");
  const userResponse = async () => {
    try {
      const { data } = await userRepository.index();
      setFaqList(data);
    } catch (e) {
      console.log("FAQが取得できませんでした。");
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ mt: 7, mb: 12 }}>
        <Container>
          <Typography
            variant="h3"
            gutterBottom
            marked="center"
            align="center"
            sx={{ mb: 4 }}
          >
            よくあるご質問
          </Typography>
          <Typography align="center" sx={{ mb: 4 }}>
            こちらをご参照ください。解決しない場合はお問い合わせください。
          </Typography>
          <Container>
            {faqList.map((faq) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default withRoot(Faq);
