import './style.css'
import { Game, Scene } from 'phaser'

class Level extends Scene {
  constructor() {
    super('level')
  }
  preload() {
    this.load.setBaseURL('https://labs.phaser.io')

    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
  }

  create() {
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'sky')
      .setScale(Math.max(window.innerWidth / 800, window.innerHeight / 600))

    const particles = this.add.particles(0, 0, 'red', {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    })

    const logo = this.physics.add.image(400, 100, 'logo')

    logo.setVelocity(100, 200)
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)

    particles.startFollow(logo)
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 50 },
    },
  },
  scene: [Level],
}

export default new Game(config)