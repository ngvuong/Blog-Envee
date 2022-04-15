import Button from '../components/Button';
import styled from 'styled-components';

import { AiOutlineArrowDown } from 'react-icons/ai';
import web from '../assets/web.png';

function Home() {
  return (
    <StyledContainer>
      <section>
        <div>
          <h1>Blog Envee</h1>
          <p>
            Welcome and enjoy your time at Blog Envee, the envy of tech blogs
            web wide. Read from a selection of blogs of cutting-edge
            technologies and everything web. Join in on the discussion and share
            your thoughts on your favorite content.
          </p>
          <Button background='#d9d9d9'>
            <a href='#blogs'>
              Read Now <AiOutlineArrowDown />
            </a>
          </Button>
        </div>
        <img src={web} alt='web technologies' draggable='false' />
      </section>
      <section id='blogs'>
        <h2>Blogs</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa animi
          hic laboriosam reprehenderit officiis quaerat a optio quia deserunt
          harum? Cumque quisquam, modi atque laboriosam architecto amet iusto
          ullam? Voluptas. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Tempora a repudiandae harum sequi aliquid magnam pariatur,
          recusandae dolor dicta? Consectetur veritatis ducimus vitae ratione in
          sint? Error dicta officiis illo quas voluptatibus consequatur eum cum
          porro ea, quibusdam ullam illum voluptates eos quisquam nemo. Enim
          numquam officiis praesentium consectetur aliquam! Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Eum non mollitia ab harum ad
          commodi repudiandae, quo ipsum numquam perferendis culpa optio
          distinctio? Sed et eum, nemo atque dolores consequuntur quia? Autem
          perspiciatis pariatur necessitatibus laboriosam qui exercitationem
          vitae amet assumenda quod ducimus nulla dolores animi error asperiores
          numquam quisquam ea provident excepturi, sapiente sequi, repudiandae
          optio, explicabo magni corporis! Numquam vitae cum culpa
          necessitatibus, hic dolor aut voluptate officia neque? Nobis nostrum
          ab suscipit eaque quia magnam voluptatem id laborum, cupiditate iure
          modi, asperiores ex minus eveniet aperiam aliquid similique sit dicta
          deleniti doloremque inventore. Saepe nisi magni suscipit.
        </p>
      </section>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5rem;

    div {
      width: 50%;
      text-align: left;
    }

    h1 {
      display: block;
      font-size: 4rem;
      text-align: left;
      margin: 1rem 0;
    }

    p {
      margin-bottom: 1rem;
    }

    img {
      width: 30%;
    }

    a {
      color: #252525;
    }
  }

  @media (max-width: 768px) {
    section {
      flex-direction: column-reverse;
      gap: 2rem;

      div {
        width: 100%;
        text-align: center;
      }
    }
  }
`;

export default Home;
