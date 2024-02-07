import { CiLinkedin, CiMail} from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { LiaGithub } from "react-icons/lia";

export default function About() {
  return (
    <>
      <div className="absolute top-0 left-0 p-4">
        <a href="/">
        <IoIosArrowBack style={{ width: "40px", height: "40px" }} />
        </a>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center text-black">
        <div className="max-w-2xl p-4 bg-white shadow-md rounded-lg">
          <p className="text-lg mb-4">
            Merhaba! Ben Emre, bu sitede insanların portföy durumlarını
            grafiklerle takip edebilecekleri kullanıcı dostu bir platform
            oluşturmayı hedefleyen bir yazılım geliştiriciyim. Yazılım
            geliştirme tutkumu ve veri görselleştirme konusundaki ilgimi bir
            araya getirerek, bu platformu oluşturmak için yola çıktım. Amacım,
            kullanıcıların yatırım portföylerini daha iyi anlamalarına ve takip
            etmelerine yardımcı olmak için kullanımı kolay bir araç sunmaktır.
            Bu platform, kullanıcıların varlık dağılımını, performanslarını ve
            diğer önemli metrikleri grafikler ve istatistiklerle görsel olarak
            takip etmelerini sağlar. Ayrıca, kullanıcıların portföylerini
            özelleştirmelerine ve kendi analizlerini yapmalarına olanak tanır.
          </p>
          <p className="text-lg mb-4">
            Benim için önemli olan kullanıcı deneyimi ve veri güvenliğidir. Bu
            yüzden, platformumu oluştururken en son teknolojileri kullanarak
            kullanıcıların güvenliğini ve gizliliğini sağlamak için titizlikle
            çalışıyorum. Eğer herhangi bir geri bildiriminiz veya öneriniz
            varsa, lütfen çekinmeden bana ulaşın. Kullanıcıların ihtiyaçlarına
            ve geri bildirimlerine dayalı olarak platformu sürekli olarak
            geliştirmeye ve iyileştirmeye açığım. Bu platforma hoş geldiniz ve
            portföyünüzü takip etmeye başlamak için hemen kaydolun!
          </p>
          <p className="text-lg">Saygılarımla, Emre</p>
        </div>
      </div>

      <footer className="-mt-10 flex flex-col items-center">
        <div className="flex space-x-4">
          <a href="https://www.linkedin.com/in/emre-recep-buzk%C4%B1ran-2a9b27269/">
            <CiLinkedin style={{ width: "30px", height: "30px" }} />
          </a>
          <a href="mailto:emrebuzkiran@gmail.com">
            <CiMail style={{ width: "30px", height: "30px" }} />
          </a>
          <a href="https://github.com/emrebuzkiran">
            <LiaGithub style={{ width: "30px", height: "30px" }} />
          </a>
        </div>
      </footer>
    </>
  );
}
