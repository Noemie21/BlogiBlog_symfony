<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="default")
     */
    public function index()
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }
    /**
     * @Route("/article", name="article")
     */
    public function article()
    {
        return $this->render('default/article.html.twig', [
            'title' => 'Un article',
            'content' => 'Contenu de <b>mon article</b>'
        ]);
    }
    /**
     * @Route("/profil", name="profil")
     */
    public function profil()
    {
        return $this->render('default/profil.html.twig', [
            'title' => 'Mon profil',
        ]);
    }
  
}
