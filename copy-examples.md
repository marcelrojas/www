Building better business with an individual approach to each client with a wide range of services.

--
div.content {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
        
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "a a" "b b" "c c";

  & > div.gmt {
       
  }

  & > div.dynamic-content  {
      
  }

  & > :first-child { grid-area: a; }
  & > :nth-child(2) { grid-area: b; }
  & > :nth-child(3) { grid-area: c; }
}
--